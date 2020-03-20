function extract(path,dir){
  if(dir.substr(dir.length-1)!="/"){
    dir=dir+"/";}
  var pack=new java.util.zip.ZipFile(path);
  var name=pack.getName().substring(pack.getName().lastIndexOf('\\')+1,pack.getName().lastIndexOf('.'));
  pathFile=new java.io.File(dir+name);
  if(!pathFile.exists()){
    pathFile.mkdirs();
  }
  var entry=new Object();
  entry=java.util.zip.ZipEntry;
  var fis = new java.io.FileInputStream(path);
  var zin = new java.util.zip.ZipInputStream(new java.io.BufferedInputStream(fis));
  while((entry = zin.getNextEntry()) != null){
    var ine=pack.getInputStream(entry);
    var outPath=dir+entry.getName();
    var file=new java.io.File(outPath.substring(0,outPath.lastIndexOf('/')));
    if(!file.exists()){
      file.mkdirs();
    }
    if(new java.io.File(outPath).isDirectory()){
      continue;
    }
    //print(outPath);
    var len;
    var buffer=new java.lang.String("0");
    buffer=buffer.getBytes();
    var out=new java.io.FileOutputStream(outPath);
    var bfd=new java.io.BufferedOutputStream(out);
    while((len=ine.read(buffer))>0){
      out.write(buffer,0,len);
    }
  }
  bfd.flush();
  out.close();
  ine.close();
}

function packing(path,dir){
  var zos=new java.util.zip.ZipOutputStream(
    new java.io.FileOutputStream(dir));
  var bos=new java.io.BufferedOutputStream(zos);
  var sfile=new java.io.File(path);
  _compress_(zos,bos,sfile,sfile.getName());
  bos.close();
  zos.close();
}

function _compress_(out,bos,sfile,base){
  if(sfile.isDirectory()){
    var fl=[];
    fl=sfile.listFiles();
    if(fl.length=0){
      out.putNextEntry(new java.util.zip.ZipEntry(base+"/"));
    }else{
      for(var i=0;i<fl.length;i++){
        _compress_(out,bos,fl[i],base+"/"+fl[i].getName());
   }}
  }else{
    out.putNextEntry(new java.util.zip.ZipEntry(base));
    var fos=new java.io.FileInputStream(sfile);
    var bis=new java.io.BufferedInputStream(fos);
    var buffer=new java.lang.Integer(0);
    while((buffer=bis.read())!=-1){
      bos.write(buffer);
    }
    bis.close();
    fos.close();
  }
}

function getPackName(path){
  var fis = new java.io.FileInputStream(path);
  var zin = new java.util.zip.ZipInputStream(new java.io.BufferedInputStream(fis));
  var entry=new Object();
  var ret=[];
  entry=java.util.zip.ZipEntry;
  while((entry = zin.getNextEntry()) != null) {
    ret.push(entry.getName());
  }
  fis=null;
  zin=null;
  entry=null;
  return ret
}

function getPackSize(path){
  var pack=new java.util.zip.ZipFile(path);
  return pack.size();
}
