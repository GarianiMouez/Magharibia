const navigation = () => {
  return [
    {
      title: 'Accueil',
      path: '/home',
      icon: 'tabler:home'
    },
    // {
    //   title: 'Second Page',
    //   path: '/second-page',
    //   icon: 'tabler:mail'
    // },
    // {
    //   path: '/acl',
    //   action: 'read',
    //   subject: 'acl-page',
    //   title: 'Access Control',
    //   icon: 'tabler:shield'
    // },
    {
      path: '/contract',
      action: 'read',
      subject: 'CreateContract',
      title: 'Créer contrat',
      icon: 'solar:document-broken'
    },
    {
      path: '/client',
      action: 'read',
      subject: 'client-list',
      title: 'List des Clients',
      icon: 'tabler:user-up'
    },
    {
      path: '/companies',
      action: 'read',
      subject: 'companies-list',
      title: 'List des Entreprises',
      icon: 'tabler:building-community'
    },
    {
      path: '/ship',
      action: 'read',
      subject: 'companies-list',
      title: 'List des Bateaux',
      icon: 'tabler:ship'
    },
    {
      path: '/pcontract',
      action: 'read',
      subject: 'pc-list',
      title: 'Contrats des Clients',
      icon: 'mdi:folder-user'
    },
    {
      path: '/econtract',
      action: 'read',
      subject: 'ec-list',
      title: 'Contrats des Entreprises',
      icon: 'mdi:folder-home'
    }
  ]
}

export default navigation
