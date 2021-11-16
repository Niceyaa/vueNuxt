const totalMessage = Object.assign(
    {
        path:'/messageList',
        component:()=>import('@/pages/message/list'),
        name:'messageList',
        children:[]
    },
    {
        path:'/messageList/messageDetail',
        component:()=>import('@/pages/message/detail'),
        name:'messageDetail',
    }
)
export default totalMessage
