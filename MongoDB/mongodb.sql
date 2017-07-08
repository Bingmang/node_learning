mongodb:://username:password@localhost/baz

show dbs

use DATABASE_NAME

db.dropDatabase()  #删除数据库

db.COLLECTION_NAME.drop() #删除集合

db.COLLECTION_NAME.insert(document) #插入文档

db.COLLECTION_NAME.insert({
    title: 'MongoDB',
    description: 'MongoDB is a NoSQL database',
    by:'w3cschool',
    tags:['mongodb', 'database', 'NoSQL'],
    likes:100
}
)

db.COLLECTION_NAME.save(document) #插入文档的另一种方法

db.COLLECTION_NAME.find()  #查看文档

#criteria->WHERE objNew->SET upsert->没有是否插入 multi->更新所有符合查询条件的记录
db.COLLECTION_NAME.update( criteria, objNew, upsert, multi)

#只更新第一条记录：
db.test0.update( { "count" : { $gt : 1 } } , { $set : { "test2" : "OK"} } ); 
#全部更新：
db.test0.update( { "count" : { $gt : 3 } } , { $set : { "test2" : "OK"} },false,true ); 
#只添加第一条：
db.test0.update( { "count" : { $gt : 4 } } , { $set : { "test5" : "OK"} },true,false ); 
#全部添加加进去:
db.test0.update( { "count" : { $gt : 5 } } , { $set : { "test5" : "OK"} },true,true ); 
#全部更新：
db.test0.update( { "count" : { $gt : 15 } } , { $inc : { "count" : 1} },false,true );
#只更新第一条记录：
db.test0.update( { "count" : { $gt : 10 } } , { $inc : { "count" : 1} },false,false );
 
db.COLLECTION_NAME.remove(
    <query>,
    {
        justOne: <boolean>,     #是否只删除一个文档
        writeConcern:<document> #抛出异常的级别
    }
)

db.COLLECTION_NAME.remove({}) #删除所有数据

db.COLLECTION_NAME.find().pretty() #以格式化的方法显示所有文档

db.COLLECTION_NAME.findOne() #只返回一个查询结果

db.col.find({"by":"w3cschool"}).pretty()  #Equal
db.col.find({"likes":{$lt:50}}).pretty()  #LessThen
db.col.find({"likes":{$lte:50}}).pretty() #LessThen or Equal
db.col.find({"likes":{$gt:50}}).pretty()  #GreaterThan
db.col.find({"likes":{$gte:50}}).pretty() #GreaterThen or Equal
db.col.find({"likes":{$ne:50}}).pretty()  #NotEqual

db.col.find({key1:value1, key2:value2}).pretty() #AND
db.col.find(
    {
        $or: [
                {"by":"w3cschool"},{"title": "MongoDB 教程"}
        ]
    }
).pretty() #OR

db.col.find({"likes": {$gt:50}, $or: [{"by": "w3cschool"},{"title": "MongoDB 教程"}]}).pretty() #AND & OR

db.COLLECTION_NAME.find().limit(NUMBER)
db.COLLECTION_NAME.find().limit(NUMBER).skip(NUMBER) #跳过几条记录
db.mycol.find({},{"title":1,_id:0}).limit(1).skip(1) #显示第二条文档数据，skip()默认参数为0

db.COLLECTION_NAME.find().sort({KEY:1})   #1为升序，-1为降序
db.mycol.find({},{"title":1,_id:0}).sort({"title":-1}) #按title键降序排序，如果没有指定，默认为升序



