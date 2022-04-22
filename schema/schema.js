const graphql=require('graphql');
const lodash=require('lodash');

const Policy=require('../models/policy.model');
const Customer=require('../models/customer.model');

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList
}=graphql;

// var policies=[
//     {pid:'1', issueDate:'2-4-2010', premium:'2000', sumEnsured:'1000000'},
//     {pid:'2', issueDate:'5-4-2010', premium:'2000', sumEnsured:'1000000'},
//     {pid:'3', issueDate:'10-4-2010', premium:'2000', sumEnsured:'1000000'},
//     {pid:'4', issueDate:'23-4-2010', premium:'2000', sumEnsured:'1000000'},
//     {pid:'5', issueDate:'3-4-2010', premium:'2000', sumEnsured:'1000000'},
// ];

// var customer=[
//     {cid:'1', name:'A', dob:'23-12-2000', gender:'female', pid:'1'},
//     {cid:'2', name:'A', dob:'23-12-2000', gender:'female', pid:'2'},
//     {cid:'4', name:'B', dob:'23-12-2000', gender:'female', pid:'1'},
//     {cid:'5', name:'C', dob:'23-12-2000', gender:'female', pid:'3'},
//     {cid:'1', name:'C', dob:'23-12-2000', gender:'female', pid:'2'},
// ];


const PolicyType=new GraphQLObjectType({
    name:'Policy',
    fields:()=>({
        pid:{type:GraphQLID},
        cid:{type:GraphQLID},
        issueDate:{type:GraphQLString},
        premium:{type:GraphQLInt},
        sumEnsured:{type:GraphQLInt},
        // customer_list:{
        //     type:new GraphQLList(Customer),
        //     resolve(parent,args){
        //         return Customer.find({cid:parent.cid})
        //     }
        // }
    })
})


const CustomerType=new GraphQLObjectType({
    name:'Customer',
    fields:()=>({
        cid:{type:GraphQLID},
        name:{type:GraphQLString},
        dob:{type:GraphQLString},
        gender:{type:GraphQLString},
        pid:{type:GraphQLID},
        policy_availed:{
            type:new GraphQLList(PolicyType),
            resolve(parent,args)
            {
                // return lodash.filter(policies,(policy)=>{
                //     if(policy.pid==parent.pid)
                //     return policy;
                // })

                return Policy.find({pid:parent.pid})
            }
        }
    })
})

const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        policies:{
            type:new GraphQLList(PolicyType),
            resolve(parent, args){
                return Policy.find();
            }
        },

        customers:{
            type:new GraphQLList(CustomerType),
            resolve(parent,args){
                return Customer.find();
            }
        },

        policy:{
            type:PolicyType,
            args:{pid:{type:GraphQLID}},

            resolve(parent, args){
                return Policy.findOne({pid:args.pid})
            }
        },

        customer:{
            type:CustomerType,
            args:{cid:{type:GraphQLID}},

            resolve(parent, args){
                // return lodash.find(customer,{cid:args.cid})
                return Customer.findOne({cid:args.cid})
            }
        }
    }
})

const Mutation=new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addCustomer:{
            type:CustomerType,
            args:{
                cid:{type:GraphQLID},
                name:{type:GraphQLString},
                dob:{type:GraphQLString},
                gender:{type:GraphQLString},
                pid:{type:GraphQLID}
            },
            resolve(parent,args){
                let customer=new Customer({
                    cid:args.cid,
                    name:args.name,
                    dob:args.dob,
                    gender:args.gender,
                    pid:args.pid
                })
               return customer.save();
            }
        },

        addPolicy:{
            type:PolicyType,
            args:{
                pid:{type:GraphQLID},
                issueDate:{type:GraphQLString},
                premium:{type:GraphQLInt},
                sumEnsured:{type:GraphQLInt}
            },

            resolve(parent,args)
            {
                let policy=new Policy({
                    pid:args.pid,
                    issueDate:args.issueDate,
                    premium:args.premium,
                    sumEnsured:args.sumEnsured
                })

                return policy.save();
            }
        }
    }
})

module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})