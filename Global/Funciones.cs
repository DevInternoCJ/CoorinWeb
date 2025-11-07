using System.Text.RegularExpressions;

namespace Loki.Global
{
    public class Funciones
    {
        public static string QuitaTeléfonos(string Comentario)
        {
            string sComentarioOriginal = Comentario, sTelefonoSinModificar = "", sTelefonoModificado = "";
            int iContador = 0;
            Regex validador = new Regex("^([+\\d!/!\\\\$*!#%&/()=?¡_<>{}]|-)");

            for (int i = 0; i < Comentario.Length; i++)
            {
                char s = Comentario[i];
                if (validador.IsMatch(s.ToString()) || char.IsWhiteSpace(s))
                {
                    sTelefonoSinModificar += s;
                    if (char.IsNumber(s))
                        iContador++;
                }

                if ((!validador.IsMatch(s.ToString()) && !char.IsWhiteSpace(s)) || i == Comentario.Length - 1)
                {
                    if (iContador >= 10)
                    {
                        sTelefonoModificado = " " + sTelefonoSinModificar.Replace(" ", "") + " ";
                        sTelefonoModificado = sTelefonoModificado.Replace("-", "");
                        sTelefonoModificado = Regex.Replace(sTelefonoModificado, "[+|-|/|\\\\|!|#|$|%|&|/|(|)|=|?|¡'|¿|*|$|<|>|_|;|:|[|]|{|}|]", "");
                        sComentarioOriginal = sComentarioOriginal.Replace(sTelefonoSinModificar, " XXXX-" + sTelefonoModificado.Substring(sTelefonoModificado.Length - 5, 4) + " ");
                        iContador = 0;
                        sTelefonoSinModificar = "";
                    }
                    if (iContador < 10)
                    {
                        iContador = 0;
                        sTelefonoSinModificar = "";
                    }
                }
            }

            return sComentarioOriginal;
        }
    }
}
