using Microsoft.AspNetCore.Mvc;

namespace Loki.Mark.Procesos.Metas.Controllers
{
    public class MetasController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
