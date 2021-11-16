const markDocEdit = Object.assign(
    {},
    {
        path:'/markDoc',
        name:'markDoc',
        component:()=>import('@/pages/markDocManagement/list'),
        meta:{title:'标书列表'},
    },
    {
        path:'/markDoc/markDocEdit',
        name:'markDocEdit',
        component:()=>import('@/pages/markDocManagement/markDocEdit'),
        meta:{title:'标书编辑'},
    }
)
console.log(1,markDocEdit)

export default markDocEdit
