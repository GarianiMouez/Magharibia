const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'tabler:smart-home'
    },
    {
      title: 'Second Page',
      path: '/second-page',
      icon: 'tabler:mail'
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'Access Control',
      icon: 'tabler:shield'
    },
    {
      path: '/pcontract',
      action: 'read',
      subject: 'acl-page',
      title: 'Contrat personnelle',
      icon: 'tabler:shield'
    }
  ]
}

export default navigation
