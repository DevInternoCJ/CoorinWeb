const dataSidebar = {
  indice1: [
    {
      id: "1A",
      divider: "Administración",
      dividerIcon: "AdjustmentsHorizontalIcon",
      collapsetoggle: "AdjustmentsHorizontalIcon",
      Menu: [
        {
          subMenus: [
            {
              id: "1AA",
              title: "Campañas",
              icon: "UserIcon",
            },
            {
              id: "2AA",
              title: "Gespa",
              icon: "UserGroupIcon",
              subMenus2: [
                {
                  id: "2AAA",
                  title: "Plantillas Correo",
                  icon: "EnvelopeIcon",
                },
                {
                  id: "3AAA",
                  title: "Frases",
                  icon: "BookOpenIcon",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  indice2: [
    {
      id: "1B",
      divider: "Consulta",
      dividerIcon: "MagnifyingGlassIcon",
      collapsetoggle: "MagnifyingGlassIcon",
      Menu: [
        {
          subMenus: [
            {
              id: "1BB",
              title: "información",
              icon: "UserGroupIcon",
              // Sin subMenus2 - abre el carrusel circular con todos los componentes
            },
          ],
        },
      ],
    },
  ],
  indice3: [
    {
      id: "1C",
      divider: "Procesos",
      dividerIcon: "LightBulbIcon",
      collapsetoggle: "LightBulbIcon",
      Menu: [
        {
          subMenus: [
            {
              id: "1CC",
              title: "Gespa",
              icon: "UserGroupIcon",
              subMenus2: [
                { id: "1CCC", title: "Comentarios", icon: "EnvelopeIcon" },
                { id: "2CCC", title: "Procesos-Gespa", icon: "BookOpenIcon" },
              ],
            },
            {
              id: "2CC",
              title: "Visitas",
              icon: "UserIcon",
              subMenus2: [
                { id: "1CCC", title: "Consulta", icon: "EnvelopeIcon" },
                { id: "2CCC", title: "Captura", icon: "BookOpenIcon" },
                { id: "3CCC", title: "Carga", icon: "BookOpenIcon" },
                { id: "4CCC", title: "Corregir", icon: "BookOpenIcon" },
                { id: "5CCC", title: "Eliminar", icon: "BookOpenIcon" },
              ],
            },
            {
              id: "3CC",
              title: "Correos",
              icon: "UserIcon",
              subMenus2: [
                { id: "1CCC", title: "Configuración", icon: "EnvelopeIcon" },
                {
                  id: "2CCC",
                  title: "Envios Ejecutivos",
                  icon: "BookOpenIcon",
                },
                {
                  id: "3CCC",
                  title: "Carga Conversación",
                  icon: "BookOpenIcon",
                },
              ],
            },
            {
              id: "4CC",
              title: "Accionamientos",
              icon: "UserIcon",
              // Sin subMenus2 - abre el modal directamente
            },
            {
              id: "5CC",
              title: "Gestiones",
              icon: "UserIcon",
              // Sin subMenus2 - abre el modal directamente
            },
            { id: "6CC", title: "Supervisor", icon: "UserIcon" },



            // { id: "7CC", title: "Domicilios", icon: "UserIcon" },
            // { id: "8CC", title: "Amex", icon: "UserIcon" },//comentado por que no se usa Menu Procesos Carteras proceso nuevo
            //{ id: "13CC", title: "Metas", icon: "UserIcon" },
          ],
        },
      ],
    },
  ],
  indice4: [
    {
      id: "1D",
      divider: "Reportes",
      dividerIcon: "DocumentArrowDownIcon",
      collapsetoggle: "DocumentArrowDownIcon",
      Menu: [
        {
          subMenus: [
            {
              id: "1DD",
              title: "Campañas",
              icon: "UserIcon",
            },
            {
              id: "2DD",
              title: "Gespa",
              icon: "UserGroupIcon",
              subMenus2: [
                {
                  id: "1DDD",
                  title: "Plantillas-Correo",
                  icon: "EnvelopeIcon",
                },
                { id: "2DDD", title: "Catalogos", icon: "BookOpenIcon" },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default dataSidebar;