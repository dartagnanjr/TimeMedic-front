using System;
using System.Collections.Generic;
using System.Data;
using System.Windows.Forms;
using Excel = Microsoft.Office.Interop.Excel;
using System.IO;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;


namespace ExportImportExcel
{
    public class ExportExcel : System.Windows.Forms.Button, IExportToExcel, IImportFromExecel
    {
        Microsoft.Office.Interop.Excel.Application XcelApp = new Microsoft.Office.Interop.Excel.Application();
        private DataGridView vpdgv = null;
        private DataTable dt = new DataTable();
        private bool vpImportExcel = false;
        private bool vpExportExcel = false;

        public ExportExcel()
            : base()
        {
            
        }

        public bool ExportToExcel
        {
            get
            {
               return vpExportExcel;
            }
            set
            {
                vpExportExcel = value;

                if (vpImportExcel)
                {
                    vpImportExcel = false;
                }
            } 
        }

        public bool ImportFromExcel
        {
            get
            {
                return vpImportExcel;
            }
            set
            {
                vpImportExcel = value;

                if (vpExportExcel)
                {
                    vpExportExcel = false;
                }
            }
            
        }

        public DataGridView DataGridEntrada { set { vpdgv = value; } }
        public DataTable DataTableSaida { get { return dt; } }

        protected override void OnClick(EventArgs e)
        {
            base.OnClick(e);
            if (vpImportExcel)
            {
                OpenFileDialog sfd = new OpenFileDialog();
                sfd.Filter = "*.xls|*.xlsx";
                sfd.ShowDialog();
                string nome = sfd.SafeFileName;

                dt = this.ImportarPlanilhaToTable(nome, sfd.FileName, sfd.SafeFileName.Substring(sfd.SafeFileName.IndexOf("."), 5));
            }
            else
            {
                this.Exportar();
            }
            
        }

        public void Exportar()
        {
            if (vpdgv.RowCount <= 0)
            {
                MessageBox.Show(null, "Nenhum registro foi encontrado na Grid.", "ATENÇÃO", MessageBoxButtons.OK);
                return;
            }
            try
            {
                copyAlltoClipboard();
                Microsoft.Office.Interop.Excel.Application xlexcel;
                Microsoft.Office.Interop.Excel.Workbook xlWorkBook;
                Microsoft.Office.Interop.Excel.Worksheet xlWorkSheet;
                object misValue = System.Reflection.Missing.Value;
                xlexcel = new Excel.Application();
                xlexcel.Visible = true;
                xlWorkBook = xlexcel.Workbooks.Add(misValue);
                xlWorkSheet = (Excel.Worksheet)xlWorkBook.Worksheets.get_Item(1);
                Excel.Range CR = (Excel.Range)xlWorkSheet.Cells[1, 1];
                CR.Select();
                xlWorkSheet.PasteSpecial(CR, System.Type.Missing, System.Type.Missing, System.Type.Missing, System.Type.Missing, System.Type.Missing, true);
            }
            catch (Exception)
            {
                MessageBox.Show("Erro ao acessar o Microsoft Excel", "ATENÇÃO", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }

        private void copyAlltoClipboard()
        {
            //to remove the first blank column from datagridview

            vpdgv.ClipboardCopyMode = DataGridViewClipboardCopyMode.EnableAlwaysIncludeHeaderText;
            vpdgv.MultiSelect = true;
            vpdgv.SelectAll();

            DataObject dataObj = vpdgv.GetClipboardContent();
            if (dataObj != null)
                Clipboard.SetDataObject(dataObj);
        }

        public DataTable ImportarPlanilhaToTable(string arquivo, string caminho, string extensao)
        {
            try
            {
                //arquivo.SaveAs(caminho);
                IWorkbook workbook;

                using (FileStream stream = new FileStream(caminho, FileMode.Open, FileAccess.Read))
                {
                    if (extensao == ".xlsx")
                    {
                        workbook = new XSSFWorkbook(stream);
                    }
                    else if (extensao == ".xls")
                    {
                        workbook = new HSSFWorkbook(stream);
                    }
                    else
                    {
                        workbook = null;
                    }
                }

                ISheet sheet = workbook.GetSheetAt(0);
                DataTable dt = new DataTable(sheet.SheetName);

                IRow headerRow = sheet.GetRow(0);
                foreach (ICell headerCell in headerRow)
                {
                    try
                    {
                        dt.Columns.Add(headerCell.ToString());
                    }
                    catch (System.Data.DuplicateNameException dex)
                    {
                        /*
                          Para campos com nome duplicado 
                          o campo será adcionado com um alías...
                        */
                        dt.Columns.Add(headerCell.ToString() + ("_b"));
                    }

                }

                int rowIndex = 0;
                foreach (IRow row in sheet)
                {
                    if (rowIndex++ == 0) continue;
                    DataRow dataRow = dt.NewRow();
                    for (int cell = 0; cell < row.Cells.Count; cell++)
                    {
                        string tipo;
                        try
                        {
                            tipo = row.GetCell(cell).CellType.ToString();
                        }
                        catch (NullReferenceException ex)
                        {
                            tipo = "null";
                        }

                        switch (tipo)
                        {
                            case "Numeric":
                                if (dt.Columns[cell].ColumnName.Contains("DATA") || dt.Columns[cell].ColumnName.Contains("DT"))
                                {
                                    dataRow.SetField(cell, row.GetCell(cell).DateCellValue.ToString());
                                }
                                else
                                {
                                    dataRow.SetField(cell, row.GetCell(cell).NumericCellValue.ToString());
                                }
                                break;
                            case "Date":
                                dataRow.SetField(cell, row.GetCell(cell).DateCellValue.ToString());
                                break;
                            case "null":
                                dataRow.SetField(cell, CellType.Blank);
                                break;
                            default:
                                dataRow.SetField(cell, row.GetCell(cell).StringCellValue);
                                break;
                        }
                    }
                    dt.Rows.Add(dataRow);
                }

                return dt;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // ExportExcel
            // 
            this.UseWaitCursor = true;
            this.ResumeLayout(false);

        }
    }
}
