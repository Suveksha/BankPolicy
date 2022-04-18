const graphql=require('graphql');
const lodash=require('lodash');

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList
}=graphql;

var policies=[
    {pid:'1', issueDate:'2-4-2010', premium:'2000', sumEnsured:'1000000'},
    {pid:'2', issueDate:'5-4-2010', premium:'2000', sumEnsured:'1000000'},
    {pid:'3', issueDate:'10-4-2010', premium:'2000', sumEnsured:'1000000'},
    {pid:'4', issueDate:'23-4-2010', premium:'2000', sumEnsured:'1000000'},
    {pid:'5', issueDate:'3-4-2010', premium:'2000', sumEnsured:'1000000'},
];

var customer=[
    {cid:'1', name:'A', dob:'23-12-2000', gender:'female', pid:'1'},
    {cid:'2', name:'A', dob:'23-12-2000', gender:'female', pid:'2'},
    {cid:'4', name:'B', dob:'23-12-2000', gender:'female', pid:'1'},
    {cid:'5', name:'C', dob:'23-12-2000', gender:'female', pid:'3'},
    {cid:'1', name:'C', dob:'23-12-2000', gender:'female', pid:'2'},
];


const PolicyType=new GraphQLObjectType({
    name:'Policy',
    fields:()=>({
        pid:{type:GraphQLID},
        issueDate:{type:GraphQLString},
        premium:{type:GraphQLInt},
        sumEnsured:{type:GraphQLInt},
        customers:{
            type:new GraphQLList(CustomerType),
            resolve(parent,args){
                return lodash.filter(customer,{pid:parent.pid})
            }
        }
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
                return lodash.filter(policies,(policy)=>{
                    if(policy.pid==parent.pid)
                    return policy;
                })
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
                return policies;
            }
        },

        customers:{
            type:new GraphQLList(CustomerType),
            resolve(parent,args){
                return customer;
            }
        },

        policy:{
            type:PolicyType,
            args:{pid:{type:GraphQLID}},

            resolve(parent, args){
                return lodash.find(policies,{pid:args.pid})
            }
        },

        customer:{
            type:CustomerType,
            args:{cid:{type:GraphQLID}},

            resolve(parent, args){
                return lodash.find(customer,{cid:args.cid})
            }
        }
    }
})

module.exports=new GraphQLSchema({
    query:RootQuery
})