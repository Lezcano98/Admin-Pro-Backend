 const GetMenuFrondEnd = ( role ='User_Role' ) =>{


    const menu = [
        {
          titulo:'Principal',
          icono:'mdi mdi-gauge',
          submenu:[
            {titulo:'Dashboard',url:'/'},
            {titulo:'ProgressBar',url:'progress'},
            {titulo:'Grafica1',url:'grafica1'},
            {titulo:'Rxjs',url:'rxjs'},
            {titulo:'Promesas',url:'promesas'},
            
          ]
        },
    
    
        {
          titulo:'Mantenimientos',
          icono:'mdi mdi-folder-lock-open',
          submenu:[
           // {titulo:'usuarios',url:'usuarios'},
            {titulo:'Hospitales',url:'hospitales'},
            {titulo:'Medicos',url:'medicos'},
          ]
        }
      ];

      if( role === 'Admin_Rol'){
          menu[1].submenu.unshift({titulo:'usuarios',url:'usuarios'});
      }

      return menu;

}

module.exports={
    GetMenuFrondEnd
}