const navigation = () => {
  return [
    {
      path: '/profil',
      action: 'read',
      subject: 'companies-list',
      title: 'Pofile',
      icon: 'tabler:user'
    },
    {
      path: '/clientContract',
      action: 'read',
      subject: 'contracts',
      title: 'List Des Contrats',
      icon: 'solar:document-broken'
    },
    {
      path: '/ship',
      action: 'read',
      subject: 'ShipList',
      title: 'List Des Bateaux',
      icon: 'tabler:ship'
    }
  ]
}

export default navigation
