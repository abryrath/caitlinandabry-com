export default  [
    {display: 'home', link: true, url: '/'},
    {display: 'our story', link: true, url: '/our-story/'},
    {display: 'details', link: true, url: '/details/'},
    {display: 'travel & accommodations', link: true, url: '/travel-accommodations/'},
    {display: 'things to do', link: false,
     children: [
         {display: 'dine', link: true, url: '/things-to-do/dine/'},
         {display: 'drink', link: true, url: '/things-to-do/drink/'},
         {display: 'explore', link: true, url: '/things-to-do/explore/'},
     ],
     submenuId: '#things-to-do-nav-submenu'
    },
    {display: 'wedding party', link: true, url: '/wedding-party/'},
    {display: 'registry', link: true, url: '/registry/'},
    {display: 'photos', link: true, url: '/photos/'},
];
