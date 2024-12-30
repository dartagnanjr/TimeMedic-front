using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Data;
using System.Windows.Forms;

namespace ExportImportExcel
{
    public interface IImportFromExecel
    {
        DataTable ImportarPlanilhaToTable(string arquivo, string caminho, string extensao);
        //DataGridView ImportarPlanilhaToGridView(string arquivo, string caminho, string extensao);
    }
}
