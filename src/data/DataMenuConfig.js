const dataMenu = [
    {
        id: 1,
        uuid: '1234-1234-1234',
        name: 'Beranda',
        description: 'Dashboard',
        url: '/admin',
        icon: 'DashboardIcon',
        children: []
    },
    {
        id: 2,
        uuid: '1234-1234-1235',
        name: 'Manajemen Pendaftar',
        description: 'Users',
        url: '/admin/users',
        icon: 'PersonAdd',
        children: []
    },
    {
        id: 3,
        uuid: '1234-1234-1236',
        name: 'Manajemen Pengguna',
        description: 'User management',
        url: '/admin/users-management',
        icon: 'GroupIcon',
        children: []
    },
    {
        id: 4,
        uuid: '1234-1234-1237',
        name: 'Manajemen Gelombang',
        description: 'Wave management',
        url: '/admin/wave-management',
        icon: 'AssessmentIcon',
        children: []
    },
    {
        id: 5,
        uuid: '1234-1234-1238',
        name: 'Bank Konten',
        description: 'Content bank',
        icon: 'LibraryBooksIcon',
        children: [
            {
                id: 51,
                uuid: '1234-1234-1238-1',
                name: 'Mata Kuliah',
                url: '/admin/content-bank/course',
            },
            {
                id: 52,
                uuid: '1234-1234-1238-2',
                name: 'Kategori',
                url: '/admin/content-bank/category',
            }
        ]
    },
    {
        id: 6,
        uuid: '1234-1234-1239',
        name: 'Kategori',
        description: 'Categories',
        url: '/admin/categories',
        icon: 'CategoryIcon',
        children: []
    },
    {
        id: 7,
        uuid: '1234-1234-1240',
        name: 'Manajemen Mata Kuliah',
        description: 'Course management',
        url: '/admin/course-management',
        icon: 'SchoolIcon',
        children: []
    },
    {
        id: 8,
        uuid: '1234-1234-1241',
        name: 'Tugas',
        description: 'Assignments',
        url: '/admin/assignments',
        icon: 'AssignmentIcon',
        children: []
    },
    {
        id: 9,
        uuid: '1234-1234-1242',
        name: 'Live Streaming',
        description: 'Live streaming',
        url: '/admin/live-streaming',
        icon: 'VideocamIcon',
        children: []
    },
    {
        id: 10,
        uuid: '1234-1234-1243',
        name: 'Sertifikat',
        description: 'Certificates',
        url: '/admin/certificates',
        icon: 'VerifiedUserIcon',
        children: []
    },
    {
        id: 11,
        uuid: '1234-1234-1244',
        name: 'Forum',
        description: 'Forum',
        url: '/admin/forum',
        icon: 'ForumIcon',
        children: []
    },
    {
        id: 12,
        uuid: '1234-1234-1245',
        name: 'Manajemen Kuesioner',
        description: 'Survey management',
        url: '/admin/survey-management',
        icon: 'PollIcon',
        children: []
    },
    {
        id: 13,
        uuid: '1234-1234-1246',
        name: 'Manajemen Keuangan',
        description: 'Financial management',
        url: '/admin/finance-management',
        icon: 'AccountBalanceIcon',
        children: []
    },
    {
        id: 14,
        uuid: '1234-1234-1247',
        name: 'Media Promosi',
        description: 'Promotional media',
        url: '/admin/promotional-media',
        icon: 'CampaignIcon',
        children: []
    },
    {
        id: 15,
        uuid: '1234-1234-1248',
        name: 'Pengaturan Laman Univ.',
        description: 'University settings',
        url: '/admin/university-settings',
        icon: 'SettingsIcon',
        children: []
    },
    {
        id: 16,
        uuid: '1234-1234-1249',
        name: 'Pengaturan Laman',
        description: 'Page settings',
        url: '/admin/page-settings',
        icon: 'WebIcon',
        children: []
    },
    {
        id: 17,
        uuid: '1234-1234-1250',
        name: 'Notifikasi',
        description: 'Notifications',
        url: '/admin/notifications',
        icon: 'NotificationsIcon',
        children: []
    }
];    

export default dataMenu;