const jwt=require('jsonwebtoken');
 function genrateToken(data){
    const finalData=JSON.stringify(data);
    const token=jwt.sign(finalData,"itisthemostsecuresecretkey");
    return token;
}
module.exports=genrateToken;