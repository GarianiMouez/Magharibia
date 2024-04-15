const navigation = () => {
  return [
    {
      path: '/contract',
      action: 'read',
      subject: 'CreateContract',
      title: 'List Des Contrat',
      icon: 'solar:document-broken'
    },

    {
      path: '/profil',
      action: 'read',
      subject: 'companies-list',
      title: 'Pofile',
      icon: 'tabler:user'
    }
  ]
}

export default navigation
