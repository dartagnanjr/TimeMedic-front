using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Excel = Microsoft.Office.Interop.Excel;

namespace ExportarParaExcel
{
    public partial class ExportExcel : System.Windows.Forms.Button
    {
        private DataGridView vpdgv = null;
        Microsoft.Office.Interop.Excel.Application XcelApp = new Microsoft.Office.Interop.Excel.Application();

        public ExportExcel()
            : base()
        {
            InitializeComponent();
        }
        public bool ExportToExcel { get; set; }
        

        public DataGridView MyProperty2 { set { vpdgv = value; } }

        protected override void OnClick(EventArgs e)
        {
            base.OnClick(e);
            if (ExportToExcel) {this.Exportar();}
        }
        
        protected override void OnPaint(PaintEventArgs pe)
        {
            base.OnPaint(pe);
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
    }
}
