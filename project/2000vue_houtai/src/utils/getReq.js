function getReq (val) {
    let url = ''
    let num = 1
    for(let key in val) {
        if (val[key]&&num===1) {
          url+= key+'='+val[key]
          num++
        } else if(val[key]&&num!==1) {
            url+='&'+key+'='+val[key]
        }
      }
      return url
}
export default getReq