const cities = [
  {
    City: 'ARIANA',
    SubCity: 'Tunis Carthage',
    cp: '2035'
  },
  {
    City: 'ARIANA',
    SubCity: 'Cité Ennasr Ariana',
    cp: '2001'
  },
  {
    City: 'ARIANA',
    SubCity: 'Borj Baccouch',
    cp: '2027'
  },
  {
    City: 'ARIANA',
    SubCity: 'Soukra',
    cp: '2036'
  },
  {
    City: 'ARIANA',
    SubCity: 'Ariana',
    cp: '2080'
  },
  {
    City: 'ARIANA',
    SubCity: 'Ariana Géant',
    cp: '2002'
  },
  {
    City: 'ARIANA',
    SubCity: 'Menzah 6',
    cp: '2091'
  },
  {
    City: 'ARIANA',
    SubCity: 'Cité La Gazelle',
    cp: '2083'
  },
  {
    City: 'BEJA',
    SubCity: 'Mjaz Elbab',
    cp: '9070'
  },
  {
    City: 'BEJA',
    SubCity: 'Teboursouk',
    cp: '9040'
  },
  {
    City: 'BEJA',
    SubCity: 'Beja',
    cp: '9000'
  },
  {
    City: 'BEJA',
    SubCity: 'Dougga',
    cp: '9032'
  },
  {
    City: 'BEN AROUS',
    SubCity: 'Rades Medina',
    cp: '2098'
  },
  {
    City: 'BEN AROUS',
    SubCity: 'Mhamdia',
    cp: '1145'
  },
  {
    City: 'BEN AROUS',
    SubCity: 'Hammam Lif',
    cp: '2050'
  },
  {
    City: 'BEN AROUS',
    SubCity: 'Radés',
    cp: '2040'
  },
  {
    City: 'BEN AROUS',
    SubCity: 'Ezzahra',
    cp: '2034'
  },
  {
    City: 'BEN AROUS',
    SubCity: 'Ben Arous',
    cp: '2013'
  },
  {
    City: 'BEN AROUS',
    SubCity: 'Errisala',
    cp: '2044'
  },
  {
    City: 'BEN AROUS',
    SubCity: 'Ezzahra El Habib',
    cp: '2065'
  },
  {
    City: 'BEN AROUS',
    SubCity: 'Nouvelle Médina',
    cp: '2063'
  },
  {
    City: 'BEN AROUS',
    SubCity: 'Mourouj 1',
    cp: '2074'
  },
  {
    City: 'BEN AROUS',
    SubCity: 'Mourouj 3',
    cp: '2068'
  },
  {
    City: 'BEN AROUS',
    SubCity: 'Megrine Riadh',
    cp: '2014'
  },
  {
    City: 'BEN AROUS',
    SubCity: 'Mornag',
    cp: '2090'
  },
  {
    City: 'BEN AROUS',
    SubCity: 'Megrine',
    cp: '2033'
  },
  {
    City: 'BIZERTE',
    SubCity: 'Bizerte',
    cp: '7000'
  },
  {
    City: 'BIZERTE',
    SubCity: 'Ras Djebel',
    cp: '7070'
  },
  {
    City: 'BIZERTE',
    SubCity: 'Bizerte bab mater',
    cp: '7061'
  },
  {
    City: 'BIZERTE',
    SubCity: 'Menzel Bourguiba',
    cp: '7050'
  },
  {
    City: 'BIZERTE',
    SubCity: 'MZL Bourguiba Ennajah',
    cp: '7072'
  },
  {
    City: 'BIZERTE',
    SubCity: 'Mateur',
    cp: '7030'
  },
  {
    City: 'BIZERTE',
    SubCity: 'Menzel Jemil',
    cp: '7080'
  },
  {
    City: 'GABES',
    SubCity: 'gabés hached',
    cp: '6001'
  },
  {
    City: 'GABES',
    SubCity: 'Gabes B-Bhar',
    cp: '6000'
  },
  {
    City: 'GABES',
    SubCity: 'Cite El Amel',
    cp: '6033'
  },
  {
    City: 'GABES',
    SubCity: 'El Hamma',
    cp: '6020'
  },
  {
    City: 'GABES',
    SubCity: 'Mareth',
    cp: '6080'
  },
  {
    City: 'GABES',
    SubCity: 'Gafsa',
    cp: '2100'
  },
  {
    City: 'GABES',
    SubCity: 'Gafsa Cité Ennour',
    cp: '2123'
  },
  {
    City: 'GABES',
    SubCity: 'Gafsa Intilaka',
    cp: '2117'
  },
  {
    City: 'GABES',
    SubCity: 'Metlaoui',
    cp: '2130'
  },
  {
    City: 'GABES',
    SubCity: 'El Guettar',
    cp: '2180'
  },
  {
    City: 'GABES',
    SubCity: 'Errdayef',
    cp: '2120'
  },
  {
    City: 'GABES',
    SubCity: 'Gafsa gare',
    cp: '2111'
  },
  {
    City: 'JENDOUBA',
    SubCity: 'Ain Drahem',
    cp: '8130'
  },
  {
    City: 'JENDOUBA',
    SubCity: 'Bousalem',
    cp: '8170'
  },
  {
    City: 'JENDOUBA',
    SubCity: 'Tabarka',
    cp: '8110'
  },
  {
    City: 'JENDOUBA',
    SubCity: 'Jendouba',
    cp: '8100'
  },
  {
    City: 'JENDOUBA',
    SubCity: 'Ghardimaou',
    cp: '8160'
  },
  {
    City: 'KAIROUAN',
    SubCity: 'Bouhajla',
    cp: '3180'
  },
  {
    City: 'KAIROUAN',
    SubCity: 'Kaiouran Okba',
    cp: '3140'
  },
  {
    City: 'KAIROUAN',
    SubCity: 'Kairouan Sud',
    cp: '3131'
  },
  {
    City: 'KAIROUAN',
    SubCity: 'Kairouan',
    cp: '3100'
  },
  {
    City: 'KAIROUAN',
    SubCity: 'Oueslatia',
    cp: '3120'
  },
  {
    City: 'KAIROUAN',
    SubCity: 'Hajeb Laayoune',
    cp: '3160'
  },
  {
    City: 'KAIROUAN',
    SubCity: 'Cité Hajjem',
    cp: '3129'
  },
  {
    City: 'KAIROUAN',
    SubCity: 'Cherarda',
    cp: '3116'
  },
  {
    City: 'KAIROUAN',
    SubCity: 'Cité ennasr kairouan',
    cp: '3182'
  },
  {
    City: 'KAIROUAN',
    SubCity: 'Cité Ibn Jazzar',
    cp: '3199'
  },
  {
    City: 'KAIROUAN',
    SubCity: 'Haffouz',
    cp: '3130'
  },
  {
    City: 'KASSERINE',
    SubCity: 'Sbiba',
    cp: '1270'
  },
  {
    City: 'KASSERINE',
    SubCity: 'Feryana',
    cp: '1240'
  },
  {
    City: 'KASSERINE',
    SubCity: 'Tela',
    cp: '1210'
  },
  {
    City: 'KASSERINE',
    SubCity: 'Kasserine',
    cp: '1200'
  },
  {
    City: 'KASSERINE',
    SubCity: 'Sbeitla',
    cp: '1250'
  },
  {
    City: 'KEBILI',
    SubCity: 'Douz',
    cp: '4260'
  },
  {
    City: 'KEBILI',
    SubCity: 'Kebili',
    cp: '4200'
  },
  {
    City: 'KEBILI',
    SubCity: 'Kébili Biez',
    cp: '4280'
  },
  {
    City: 'KEBILI',
    SubCity: 'Souk Lahad',
    cp: '4230'
  },
  {
    City: 'KEF',
    SubCity: 'Dahmani',
    cp: '7170'
  },
  {
    City: 'KEF',
    SubCity: 'Kef',
    cp: '7100'
  },
  {
    City: 'KEF',
    SubCity: 'Tejerouin',
    cp: '7150'
  },
  {
    City: 'KEF',
    SubCity: 'Kef Ouest',
    cp: '7117'
  },
  {
    City: 'MAHDIA',
    SubCity: 'Hekaima',
    cp: '5131'
  },
  {
    City: 'MAHDIA',
    SubCity: 'Mahdia Republique',
    cp: '5150'
  },
  {
    City: 'MAHDIA',
    SubCity: 'Chebba',
    cp: '5170'
  },
  {
    City: 'MAHDIA',
    SubCity: 'Mahdia',
    cp: '5100'
  },
  {
    City: 'MAHDIA',
    SubCity: 'Mahdia Hiboun',
    cp: '5111'
  },
  {
    City: 'MAHDIA',
    SubCity: 'Ksour Essef',
    cp: '5180'
  },
  {
    City: 'MAHDIA',
    SubCity: 'Souassi',
    cp: '5140'
  },
  {
    City: 'MAHDIA',
    SubCity: 'El Jamm',
    cp: '5160'
  },
  {
    City: 'MANNOUBA',
    SubCity: 'Tebourba',
    cp: '1130'
  },
  {
    City: 'MANNOUBA',
    SubCity: 'Mornaguia',
    cp: '1110'
  },
  {
    City: 'MANNOUBA',
    SubCity: 'Denden',
    cp: '2011'
  },
  {
    City: 'MANNOUBA',
    SubCity: 'Mannouba',
    cp: '2010'
  },
  {
    City: 'MEDENINE',
    SubCity: 'El May',
    cp: '4175'
  },
  {
    City: 'MEDENINE',
    SubCity: 'Ajim',
    cp: '4135'
  },
  {
    City: 'MEDENINE',
    SubCity: 'Mouensa',
    cp: '4144'
  },
  {
    City: 'MEDENINE',
    SubCity: 'Midoun',
    cp: '4116'
  },
  {
    City: 'MEDENINE',
    SubCity: 'Zarzis',
    cp: '4170'
  },
  {
    City: 'MEDENINE',
    SubCity: 'Medenine',
    cp: '4100'
  },
  {
    City: 'MEDENINE',
    SubCity: 'Jerba',
    cp: '4180'
  },
  {
    City: 'MEDENINE',
    SubCity: 'Jerba Aéroport',
    cp: '4120'
  },
  {
    City: 'MEDENINE',
    SubCity: 'Cedouikech',
    cp: '4145'
  },
  {
    City: 'MEDENINE',
    SubCity: 'Akrou',
    cp: '4176'
  },
  {
    City: 'MEDENINE',
    SubCity: 'Benguerden',
    cp: '4160'
  },
  {
    City: 'MEDENINE',
    SubCity: 'Souihel',
    cp: '4173'
  },
  {
    City: 'MONASTIR',
    SubCity: 'Ksar Hellal',
    cp: '5070'
  },
  {
    City: 'MONASTIR',
    SubCity: 'Moknine',
    cp: '5050'
  },
  {
    City: 'MONASTIR',
    SubCity: 'Jammel',
    cp: '5020'
  },
  {
    City: 'MONASTIR',
    SubCity: 'Monastir',
    cp: '5000'
  },
  {
    City: 'MONASTIR',
    SubCity: 'Ksar Hlel Riadh',
    cp: '5016'
  },
  {
    City: 'MONASTIR',
    SubCity: 'Monastir République',
    cp: '5060'
  },
  {
    City: 'MONASTIR',
    SubCity: 'Teboulba',
    cp: '5080'
  },
  {
    City: 'NABEUL',
    SubCity: 'Kelibia',
    cp: '8090'
  },
  {
    City: 'NABEUL',
    SubCity: 'Yasmine Hammamet',
    cp: '8057'
  },
  {
    City: 'NABEUL',
    SubCity: 'Nabeul Thameur',
    cp: '8062'
  },
  {
    City: 'NABEUL',
    SubCity: 'Béni Khiar',
    cp: '8060'
  },
  {
    City: 'NABEUL',
    SubCity: 'Korba',
    cp: '8070'
  },
  {
    City: 'NABEUL',
    SubCity: 'Mrezga',
    cp: '8058'
  },
  {
    City: 'NABEUL',
    SubCity: 'Soliman',
    cp: '8020'
  },
  {
    City: 'NABEUL',
    SubCity: 'Grombalia',
    cp: '8030'
  },
  {
    City: 'NABEUL',
    SubCity: 'Dar Chaaban Fehri',
    cp: '8011'
  },
  {
    City: 'NABEUL',
    SubCity: 'Hammamet',
    cp: '8050'
  },
  {
    City: 'NABEUL',
    SubCity: 'Menzel Temim',
    cp: '8080'
  },
  {
    City: 'NABEUL',
    SubCity: 'Nabeul',
    cp: '8000'
  },
  {
    City: 'SFAX',
    SubCity: 'Merkez Chihya',
    cp: '3041'
  },
  {
    City: 'SFAX',
    SubCity: 'Merkez Bouacida',
    cp: '3031'
  },
  {
    City: 'SFAX',
    SubCity: 'Cité El Habib',
    cp: '3052'
  },
  {
    City: 'SFAX',
    SubCity: 'Sidi Abbes',
    cp: '3062'
  },
  {
    City: 'SFAX',
    SubCity: 'Sfax Jadida',
    cp: '3027'
  },
  {
    City: 'SFAX',
    SubCity: 'Merkez El Alia',
    cp: '3051'
  },
  {
    City: 'SFAX',
    SubCity: 'Sfax 15 Novembre',
    cp: '3089'
  },
  {
    City: 'SFAX',
    SubCity: 'Cité Khayri',
    cp: '3079'
  },
  {
    City: 'SFAX',
    SubCity: 'Cité Bahri',
    cp: '3064'
  },
  {
    City: 'SFAX',
    SubCity: 'Esskhira',
    cp: '3050'
  },
  {
    City: 'SFAX',
    SubCity: 'Sfax',
    cp: '3000'
  },
  {
    City: 'SFAX',
    SubCity: 'Karkena',
    cp: '3070'
  },
  {
    City: 'SFAX',
    SubCity: 'Sfax Hached',
    cp: '3069'
  },
  {
    City: 'SFAX',
    SubCity: 'El Bousténe',
    cp: '3099'
  },
  {
    City: 'SFAX',
    SubCity: 'Tyna',
    cp: '3083'
  },
  {
    City: 'SFAX',
    SubCity: 'El Aguereb',
    cp: '3030'
  },
  {
    City: 'SFAX',
    SubCity: 'Sakiet Ezzit',
    cp: '3021'
  },
  {
    City: 'SFAX',
    SubCity: 'Jbeniyana',
    cp: '3080'
  },
  {
    City: 'SFAX',
    SubCity: 'El Hencha',
    cp: '3010'
  },
  {
    City: 'SFAX',
    SubCity: 'Sfax Maghreb Arabe',
    cp: '3049'
  },
  {
    City: 'SFAX',
    SubCity: 'El Mahres',
    cp: '3060'
  },
  {
    City: 'SFAX',
    SubCity: 'Sakiet Eddaier',
    cp: '3011'
  },
  {
    City: 'SIDI BOUZID',
    SubCity: 'Benaoun',
    cp: '9120'
  },
  {
    City: 'SIDI BOUZID',
    SubCity: 'Bir El Hfay',
    cp: '9113'
  },
  {
    City: 'SIDI BOUZID',
    SubCity: 'Jilma',
    cp: '9110'
  },
  {
    City: 'SIDI BOUZID',
    SubCity: 'Meknasi',
    cp: '9140'
  },
  {
    City: 'SIDI BOUZID',
    SubCity: 'Sidi Bou Zid',
    cp: '9100'
  },
  {
    City: 'SIDI BOUZID',
    SubCity: 'Ergueb',
    cp: '9170'
  },
  {
    City: 'SILIANA',
    SubCity: 'Makthar',
    cp: '6140'
  },
  {
    City: 'SILIANA',
    SubCity: 'Bouarada',
    cp: '6180'
  },
  {
    City: 'SILIANA',
    SubCity: 'Siliana',
    cp: '6100'
  },
  {
    City: 'SILIANA',
    SubCity: 'Rouhia',
    cp: '6150'
  },
  {
    City: 'SOUSSE',
    SubCity: 'Enfidha',
    cp: '4030'
  },
  {
    City: 'SOUSSE',
    SubCity: 'Sousse Khzema',
    cp: '4051'
  },
  {
    City: 'SOUSSE',
    SubCity: 'Hammam Sousse',
    cp: '4011'
  },
  {
    City: 'SOUSSE',
    SubCity: 'Hammam Sousse Plage',
    cp: '4083'
  },
  {
    City: 'SOUSSE',
    SubCity: 'Kalla Kebira',
    cp: '4060'
  },
  {
    City: 'SOUSSE',
    SubCity: 'Sousse',
    cp: '4000'
  },
  {
    City: 'SOUSSE',
    SubCity: 'Sahloul',
    cp: '4054'
  },
  {
    City: 'SOUSSE',
    SubCity: 'Sousse Corniche',
    cp: '4059'
  },
  {
    City: 'SOUSSE',
    SubCity: 'Hammam Sousse Gharbi',
    cp: '4017'
  },
  {
    City: 'SOUSSE',
    SubCity: 'Msaken',
    cp: '4070'
  },
  {
    City: 'SOUSSE',
    SubCity: 'Sousse Ibn Khaldoun',
    cp: '4061'
  },
  {
    City: 'SOUSSE',
    SubCity: 'Sousse Erriadh',
    cp: '4023'
  },
  {
    City: 'SOUSSE',
    SubCity: 'Kantaoui',
    cp: '4089'
  },
  {
    City: 'TATAOUINE',
    SubCity: 'Tataouine Mahrajéne',
    cp: '3234'
  },
  {
    City: 'TATAOUINE',
    SubCity: 'Tataouine Ettahrir',
    cp: '3263'
  },
  {
    City: 'TATAOUINE',
    SubCity: 'Ghomrassen',
    cp: '3220'
  },
  {
    City: 'TATAOUINE',
    SubCity: 'Tataouine',
    cp: '3200'
  },
  {
    City: 'TOZEUR',
    SubCity: 'Nefta',
    cp: '2240'
  },
  {
    City: 'TOZEUR',
    SubCity: 'Dguech',
    cp: '2260'
  },
  {
    City: 'TOZEUR',
    SubCity: 'Touzeur',
    cp: '2200'
  },
  {
    City: 'TOZEUR',
    SubCity: 'Tozeur Chokrasti',
    cp: '2210'
  },
  {
    City: 'TUNIS',
    SubCity: 'Zahrouni',
    cp: '2051'
  },
  {
    City: 'TUNIS',
    SubCity: 'Cité Mahragéne',
    cp: '1082'
  },
  {
    City: 'TUNIS',
    SubCity: 'Sidi Hassine',
    cp: '1095'
  },
  {
    City: 'TUNIS',
    SubCity: 'Mohamed V',
    cp: '1023'
  },
  {
    City: 'TUNIS',
    SubCity: 'Tunis RP',
    cp: '1000'
  },
  {
    City: 'TUNIS',
    SubCity: 'Tunis Republique',
    cp: '1001'
  },
  {
    City: 'TUNIS',
    SubCity: 'Monplaisir',
    cp: '1073'
  },
  {
    City: 'TUNIS',
    SubCity: 'El Manar II',
    cp: '2092'
  },
  {
    City: 'TUNIS',
    SubCity: 'Berge du Lac',
    cp: '1053'
  },
  {
    City: 'TUNIS',
    SubCity: 'Tunis Thameur',
    cp: '1069'
  },
  {
    City: 'TUNIS',
    SubCity: 'Carthage',
    cp: '2016'
  },
  {
    City: 'TUNIS',
    SubCity: 'Marsa Safsaf',
    cp: '2078'
  },
  {
    City: 'TUNIS',
    SubCity: 'Tunis Belvedére',
    cp: '1002'
  },
  {
    City: 'TUNIS',
    SubCity: 'Bardo',
    cp: '2000'
  },
  {
    City: 'TUNIS',
    SubCity: 'Tunis Hached',
    cp: '1049'
  },
  {
    City: 'TUNIS',
    SubCity: 'Cité El Mhiri',
    cp: '2045'
  },
  {
    City: 'TUNIS',
    SubCity: 'Cité Rommana',
    cp: '1068'
  },
  {
    City: 'TUNIS',
    SubCity: 'Cité Ezzouhour',
    cp: '2052'
  },
  {
    City: 'TUNIS',
    SubCity: 'Bab Menara',
    cp: '1008'
  },
  {
    City: 'TUNIS',
    SubCity: 'Bab El Khadhra',
    cp: '1075'
  },
  {
    City: 'TUNIS',
    SubCity: 'Tunis Aéroport',
    cp: '2079'
  },
  {
    City: 'TUNIS',
    SubCity: 'El Menzah',
    cp: '1004'
  },
  {
    City: 'TUNIS',
    SubCity: 'Bab Souika',
    cp: '1006'
  },
  {
    City: 'TUNIS',
    SubCity: 'Cité El Khadra',
    cp: '1003'
  },
  {
    City: 'ZAGHOUAN',
    SubCity: 'El Fahs',
    cp: '1140'
  },
  {
    City: 'ZAGHOUAN',
    SubCity: 'Bir Mcherga',
    cp: '1141'
  },
  {
    City: 'ZAGHOUAN',
    SubCity: 'Zaghouan',
    cp: '1100'
  },
  {
    City: 'ZAGHOUAN',
    SubCity: 'Jbel El West',
    cp: '1111'
  },
  {
    City: 'ZAGHOUAN',
    SubCity: 'Hammam Zriba',
    cp: '1152'
  },
  {
    City: 'ZAGHOUAN',
    SubCity: 'Ennadhour',
    cp: '1160'
  }
]
export default cities
