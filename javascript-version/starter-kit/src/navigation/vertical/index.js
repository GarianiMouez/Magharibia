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
      subject: 'client-Liste',
      title: 'Personnes Physiques',
      icon: 'tabler:user-up'
    },
    {
      path: '/companies',
      action: 'read',
      subject: 'companies-Liste',
      title: 'Personnes Morales',
      icon: 'tabler:building-community'
    },
    {
      path: '/ship',
      action: 'read',
      subject: 'companies-Liste',
      title: 'Liste des Bateaux',
      icon: 'tabler:ship'
    },
    {
      path: '/pcontract',
      action: 'read',
      subject: 'pc-Liste',
      title: 'Contrats Personnes Physiques',
      icon: 'mdi:folder-user'
    },
    {
      path: '/econtract',
      action: 'read',
      subject: 'ec-Liste',
      title: 'Contrats Personnes Morales',
      icon: 'mdi:folder-home'
    }
  ]
}

export default navigation
