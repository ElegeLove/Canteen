export default [{
        path: '/procurement',
        name: 'procurement',
        component: () =>
            import ('@/pages/Procurement/Layout'),
        meta: {
            requireAuth: true,
        },
        children: [
            // 产品目录
            {
                path: 'productMenu',
                name: 'productMenu',
                component: () =>
                    import ('@/pages/Procurement/Layout'),
                redirect: {
                    name: 'productMenu_list'
                },
                meta: {
                    requireAuth: true,
                },
                children: [{
                        path: 'list',
                        name: 'productMenu_list',
                        component: () =>
                            import ('@/pages/Procurement/ProductMenu/index'),
                        meta: {
                            requireAuth: true,
                            relation: "productMenu"
                        },
                    },
                    {
                        path: 'info/:pid',
                        name: 'productMenu_info',
                        component: () =>
                            import ('@/pages/Procurement/ProductMenu/info'),
                        meta: {
                            requireAuth: true,
                            relation: "productMenu"
                        },
                    }
                ]
            },
            //采购计划
            {
                path: 'plan',
                name: 'plan',
                component: () =>
                    import ('@/pages/Procurement/Layout'),
                redirect: '/procurement/plan/planList',
                meta: {
                    requireAuth: true,
                },
                children: [{
                        path: 'planList',
                        name: 'planList',
                        component: () =>
                            import ('@/pages/Procurement/Plan/index'),
                        meta: {
                            requireAuth: true,
                            relation: "plan"
                        },
                    },
                    {
                        path: 'info/:id',
                        name: 'planInfo',
                        component: () =>
                            import ('@/pages/Procurement/Plan/info'),
                        meta: {
                            requireAuth: true,
                            relation: "plan"
                        },
                    },
                    {
                        path: 'edit/:id',
                        name: 'planEdit',
                        component: () =>
                            import ('@/pages/Procurement/Plan/edit'),
                        meta: {
                            requireAuth: true,
                            relation: "plan"
                        },
                    },
                    {
                        path: 'update/:id',
                        name: 'planEdit',
                        component: () =>
                            import ('@/pages/Procurement/Plan/update'),
                        meta: {
                            requireAuth: true,
                            relation: "plan"
                        },
                    },
                    //按天编写采购计划
                    {
                        path: 'byDay/:id',
                        name: 'planByDay',
                        component: () =>
                            import ('@/pages/Procurement/Plan/byDay'),
                        meta: {
                            requireAuth: true,
                            relation: "plan"
                        },
                    },
                    //按周编写采购计划
                    {
                        path: 'byWeek/:id',
                        name: 'planByWeek',
                        component: () =>
                            import ('@/pages/Procurement/Plan/byWeek'),
                        meta: {
                            requireAuth: true,
                            relation: "plan"
                        },
                    },
                ]
            },
            //订货下单
            {
                path: 'orderPro',
                name: 'orderPro',
                component: () =>
                    import ('@/pages/Procurement/OrderPro/Index'),
                redirect: '/procurement/orderPro/byPlan',
                meta: {
                    requireAuth: true,
                },
                children: [
                    //按计划下单
                    {
                        path: 'byPlan',
                        name: 'byPlan',
                        component: () =>
                            import ('@/pages/Procurement/Layout'),
                        redirect: '/procurement/orderPro/byPlan/list',
                        meta: {
                            requireAuth: true,
                            relation: "orderPro"
                        },
                        children: [{
                                path: 'list',
                                name: 'byPlanList',
                                component: () =>
                                    import ('@/pages/Procurement/OrderPro/ByPlan/main'),
                                meta: {
                                    requireAuth: true,
                                    tabName: 'byPlan',
                                    relation: "orderPro"
                                },
                                redirect: '/procurement/orderPro/byPlan/list/week',
                                children: [{
                                        path: 'day',
                                        name: 'byPlanListDay',
                                        component: () =>
                                            import ('@/pages/Procurement/OrderPro/ByPlan/day'),
                                        meta: {
                                            requireAuth: true,
                                            tabName: 'byPlan',
                                            relation: "orderPro"
                                        },
                                    },
                                    {
                                        path: 'week',
                                        name: 'byPlanListWeek',
                                        component: () =>
                                            import ('@/pages/Procurement/OrderPro/ByPlan/week'),
                                        meta: {
                                            requireAuth: true,
                                            tabName: 'byPlan',
                                            relation: "orderPro"
                                        },
                                    }
                                ]
                            },
                            {
                                path: 'deal',
                                name: 'byPlanDeal',
                                component: () =>
                                    import ('@/pages/Procurement/OrderPro/ByPlan/deal'),
                                meta: {
                                    requireAuth: true,
                                    tabName: 'byPlan',
                                    relation: "orderPro"
                                },
                            },
                            {
                                path: 'dealInfo/:id',
                                name: 'byPlanDealInfo',
                                component: () =>
                                    import ('@/pages/Procurement/OrderPro/ByPlan/dealInfo'),
                                meta: {
                                    requireAuth: true,
                                    tabName: 'byPlan',
                                    relation: "orderPro"

                                },
                            },
                            {
                                path: 'selectPro',
                                name: 'byPlanSelectPro',
                                component: () =>
                                    import ('@/pages/Procurement/OrderPro/ByPlan/selectPro'),
                                meta: {
                                    requireAuth: true,
                                    tabName: 'byPlan',
                                    relation: "orderPro"
                                },
                            },
                            {
                                path: 'proInfo/:id',
                                name: 'byPlanProInfo',
                                component: () =>
                                    import ('@/pages/Procurement/OrderPro/ByPlan/proInfo'),
                                meta: {
                                    requireAuth: true,
                                    tabName: 'byPlan',
                                    relation: "orderPro"
                                },
                            }
                        ]
                    },
                    //自选采购
                    {
                        path: 'bySelf',
                        name: 'bySelf',
                        component: () =>
                            import ('@/pages/Procurement/Layout'),
                        redirect: '/procurement/orderPro/bySelf/bySelfList',
                        meta: {
                            requireAuth: true,
                        },
                        children: [{
                                path: 'bySelfList',
                                name: 'bySelfList',
                                component: () =>
                                    import ('@/pages/Procurement/OrderPro/bySelf/index'),
                                meta: {
                                    requireAuth: true,
                                    tabName: 'bySelf',
                                    relation: "orderPro"
                                },
                            },
                            {
                                path: 'deal',
                                name: 'bySelfDeal',
                                component: () =>
                                    import ('@/pages/Procurement/OrderPro/bySelf/deal'),
                                meta: {
                                    requireAuth: true,
                                    tabName: 'bySelf',
                                    relation: "orderPro"
                                },
                            },
                            {
                                path: 'addCartSuccess',
                                name: 'addCartSuccess',
                                component: () =>
                                    import ('@/pages/Procurement/OrderPro/bySelf/addCartSuccess'),
                                meta: {
                                    requireAuth: true,
                                    tabName: 'bySelf',
                                    relation: "orderPro"
                                },
                            }
                        ]
                    },
                    //购物车
                    {
                        path: 'cart',
                        name: 'cart',
                        component: () =>
                            import ('@/pages/Procurement/Layout'),
                        redirect: '/procurement/orderPro/cart/cartList',
                        meta: {
                            requireAuth: true,
                        },

                        children: [{
                                path: 'cartList',
                                name: 'cartList',
                                component: () =>
                                    import ('@/pages/Procurement/OrderPro/Cart/index'),
                                meta: {
                                    requireAuth: true,
                                    tabName: 'cart',
                                    relation: "orderPro"
                                },
                            },
                            {
                                path: 'deal',
                                name: 'cartDeal',
                                component: () =>
                                    import ('@/pages/Procurement/OrderPro/Cart/deal'),
                                meta: {
                                    requireAuth: true,
                                    tabName: 'cart',
                                    relation: "orderPro"
                                },
                            },
                            {
                                path: 'success',
                                name: 'cartPaySuccess',
                                component: () =>
                                    import ('@/pages/Procurement/OrderPro/Cart/paySuccess'),
                                meta: {
                                    requireAuth: true,
                                    tabName: 'cart',
                                    relation: "orderPro"
                                },
                            },
                            {
                                path: 'oneSuccess',
                                name: 'oneSuccess',
                                component: () =>
                                    import ('@/pages/Procurement/OrderPro/Cart/paySuccess'),
                                meta: {
                                    requireAuth: true,
                                    tabName: 'byPlan',
                                    relation: "orderPro"
                                },
                            }
                        ]
                    }
                ]
            },
            //订货单
            {
                path: 'orderList',
                name: 'orderList',
                meta: {
                    requireAuth: true,
                },
                component: () =>
                    import ('@/pages/Procurement/Layout'),
                redirect: '/procurement/orderList/index',
                children: [{
                        path: 'index',
                        name: 'orderListIndex',
                        component: () =>
                            import ('@/pages/Procurement/OrderList/index'),
                        meta: {
                            requireAuth: true,
                            relation: "orderList"
                        }
                    },
                    {
                        path: 'info/:id',
                        name: 'orderListInfo',
                        component: () =>
                            import ('@/pages/Procurement/OrderList/info'),
                        meta: {
                            requireAuth: true,
                            relation: "orderList"
                        }
                    }
                ]
            }
        ]
    },
    {
        path: '/outAndIn',
        name: 'outAndIn',
        component: () =>
            import ('@/pages/Procurement/Layout'),
        meta: {
            requireAuth: true,
        },
        children: [{
                path: 'in',
                name: 'in',
                component: () =>
                    import ('@/pages/Procurement/Layout'),
                meta: {
                    requireAuth: true,
                },
                children: [{
                        path: 'inIndex',
                        name: 'inIndex',
                        component: () =>
                            import ('@/pages/OutAndIn/In/index'),
                        redirect: '/outAndIn/in/inIndex/list',
                        meta: {
                            requireAuth: true,
                        },
                        children: [{
                                path: 'list',
                                name: 'outAndIn_in_list',
                                component: () =>
                                    import ('@/pages/OutAndIn/In/Index/list'),
                                meta: {
                                    requireAuth: true,
                                    tabName: 'outAndIn_in_list',
                                    relation: "in"
                                }
                            },
                            {
                                path: 'record',
                                name: 'outAndIn_in_record',
                                component: () =>
                                    import ('@/pages/OutAndIn/In/Index/record'),
                                meta: {
                                    requireAuth: true,
                                    tabName: 'outAndIn_in_record',
                                    relation: "in"
                                }
                            },
                            {
                                path: 'confirm',
                                name: 'outAndIn_in_confirm',
                                component: () =>
                                    import ('@/pages/OutAndIn/In/confirm'),
                                meta: {
                                    requireAuth: true,
                                    tabName: 'outAndIn_in_list',
                                    relation: "in"
                                }
                            },
                            {
                                path: 'confirm_country',
                                name: 'outAndIn_in_confirmCountry',
                                component: () =>
                                    import ('@/pages/OutAndIn/In/confirm_country'),
                                meta: {
                                    requireAuth: true,
                                    tabName: 'outAndIn_in_list',
                                    relation: "in"
                                }
                            },
                            {
                                path: 'warrant',
                                name: 'outAndIn_in_warrant',
                                component: () =>
                                    import ('@/pages/OutAndIn/In/warrant'),
                                meta: {
                                    requireAuth: true,
                                    tabName: 'outAndIn_in_list',
                                    relation: "in"
                                }
                            },
                            {
                                path: 'add',
                                name: 'outAndIn_in_addForm',
                                component: () =>
                                    import ('@/pages/OutAndIn/In/addForm'),
                                meta: {
                                    requireAuth: true,
                                    tabName: 'outAndIn_in_list',
                                    relation: "in"
                                }
                            },
                        ]
                    },
                    {
                        path: 'nonFixedManage',
                        name: 'outAndIn_in_nonFixedManage',
                        component: () =>
                            import ('@/pages/OutAndIn/In/nonFixedManage'),
                        // redirect: '/outAndIn/in/nonFixedManage',
                        // relation: "in",
                        meta: {
                            requireAuth: true,
                            relation: "in",
                        }
                    },
                ]
            },
            //出库
            {
                path: 'out',
                name: 'out',
                component: () =>
                    import ('@/pages/Procurement/Layout'),
                meta: {
                    requireAuth: true,
                },
                children: [{
                    path: 'outIndex',
                    name: 'outAndIn_out_index',
                    component: () =>
                        import ('@/pages/OutAndIn/Out/index'),
                    meta: {
                        requireAuth: true,
                    },
                    redirect: '/outAndIn/out/outIndex/list',

                    children: [{
                            path: 'list',
                            name: 'outAndIn_out_list',
                            component: () =>
                                import ('@/pages/OutAndIn/Out/Index/list'),
                            meta: {
                                requireAuth: true,
                                tabName: 'outAndIn_out_list',
                                relation: "out"
                            }
                        },
                        {
                            path: 'record',
                            name: 'outAndIn_out_record',
                            component: () =>
                                import ('@/pages/OutAndIn/Out/Index/record'),
                            meta: {
                                requireAuth: true,
                                tabName: 'outAndIn_out_record',
                                relation: "out"
                            }
                        },
                        {
                            path: 'inventory',
                            name: 'outAndIn_out_inventory',
                            component: () =>
                                import ('@/pages/OutAndIn/Out/Index/inventory'),
                            meta: {
                                requireAuth: true,
                                tabName: 'outAndIn_out_inventory',
                                relation: "out"
                            }
                        },
                        {
                            path: 'info/:id',
                            name: 'outAndIn_out_record_info',
                            component: () =>
                                import ('@/pages/OutAndIn/Out/recordDetail'),
                            meta: {
                                requireAuth: true,
                                tabName: 'outAndIn_out_record',
                                relation: "out"
                            }
                        },
                        {
                            path: 'recipe',
                            name: 'outAndIn_out_recipe',
                            component: () =>
                                import ('@/pages/OutAndIn/Out/recipe'),
                            meta: {
                                requireAuth: true,
                                tabName: 'outAndIn_out_list',
                                relation: "out"
                            }
                        },
                        {
                            path: 'temporary',
                            name: 'outAndIn_out_temporary',
                            component: () =>
                                import ('@/pages/OutAndIn/Out/temporary'),
                            meta: {
                                requireAuth: true,
                                tabName: 'outAndIn_out_list',
                                relation: "out"
                            }
                        }
                    ]
                }]
            },
            //台账
            {
                path: 'account',
                name: 'account',
                component: () =>
                    import ('@/pages/Procurement/Layout'),
                meta: {
                    requireAuth: true,
                },
                children: [{
                        path: 'accountIndex',
                        name: 'outAndIn_account_index',
                        component: () =>
                            import ('@/pages/OutAndIn/Account/index'),
                        meta: {
                            requireAuth: true,
                            relation: "account"
                        },
                    },
                    {
                        path: 'info',
                        name: 'outAndIn_account_info',
                        component: () =>
                            import ('@/pages/OutAndIn/Account/info'),
                        meta: {
                            requireAuth: true,
                            relation: "account"
                        },
                    }
                ]
            },
            //报表
            {
                path: 'statement',
                name: 'statement',
                component: () =>
                    import ('@/pages/Procurement/Layout'),
                meta: {
                    requireAuth: true,
                },
                children: [{
                    path: 'statementIndex',
                    name: 'statementIndex',
                    component: () =>
                        import ('@/pages/OutAndIn/Statement/index'),
                    redirect: '/outAndIn/statement/statementIndex/buy',
                    meta: {
                        requireAuth: true,
                    },
                    children: [{
                            path: 'buy',
                            name: 'outAndIn_statement_buy',
                            component: () =>
                                import ('@/pages/OutAndIn/Statement/buy'),
                            meta: {
                                requireAuth: true,
                                tabName: 'outAndIn_statement_buy',
                                relation: "statement"
                            }
                        },
                        {
                            path: 'plan',
                            name: 'outAndIn_statement_plan',
                            component: () =>
                                import ('@/pages/OutAndIn/Statement/plan'),
                            meta: {
                                requireAuth: true,
                                tabName: 'outAndIn_statement_plan',
                                relation: "statement"
                            }
                        },
                        {
                            path: 'info',
                            name: 'outAndIn_statement_info',
                            component: () =>
                                import ('@/pages/OutAndIn/Statement/info'),
                            meta: {
                                requireAuth: true,
                                tabName: 'outAndIn_statement_buy',
                                relation: "statement"
                            }
                        },
                        {
                            path: 'planDetailsd',
                            name: 'planDetailsd',
                            component: () =>
                                import ('@/pages/OutAndIn/Statement/planDetailsd'),
                            meta: {
                                requireAuth: true,
                                tabName: 'outAndIn_statement_plan',
                                relation: "statement"
                            }
                        }
                    ]
                }]
            },
            //结算管理
            {
                path: 'settlement',
                name: 'settlement',
                component: () =>
                    import ('@/pages/Procurement/Layout'),
                meta: {
                    requireAuth: true,
                },
                children: [{
                    path: 'administration',
                    name: 'administration',
                    component: () =>
                        import ('@/pages/OutAndIn/Settlement'),
                    meta: {
                        requireAuth: true,
                        relation: "settlement"
                    },
                }]
            },
        ]

    }
]