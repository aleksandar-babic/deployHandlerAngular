export const PAGES_MENU = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'general.menu.dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'apps',
        data: {
          menu: {
            title: 'general.menu.apps',
            icon: 'ion-laptop',
            selected: false,
            expanded: false,
            order: 100
          }
        },
        children:[
          {
            path: 'manage',
            data: {
              menu: {
                title: 'general.menu.viewapps',
                selected: false,
                expanded: false
              }
            }
          },
          {
            path: 'add',
            data: {
              menu: {
                title: 'general.menu.addapp',
                selected: false,
                expanded: false
              }
            }
          }
        ],
      },
      {
        path: 'settings',
        data: {
          menu: {
            title: 'general.menu.settings',
            icon: 'ion-settings',
            selected: false,
            expanded: false,
            order: 200
          }
        }
      },
      {
        path: 'help',
        data: {
          menu: {
            title: 'general.menu.help',
            icon: 'ion-help',
            selected: false,
            expanded: false,
            order: 200
          }
        }
      }

    ]
  }
];
