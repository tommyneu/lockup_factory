#target illustrator  

var rootFolder = (new File($.fileName)).parent.absoluteURI;

// this is the file name given by the system for the lockups
var fileName = rootFolder.split("/");
fileName = fileName.pop();
fileName = fileName.substring(0, fileName.lastIndexOf("_lockups"));
fileName = fileName.substring(2);

createFile(rootFolder+"/Nh_"+fileName+"/4c_CMYK/Nh_"+fileName+"_4c_rev.ai", rootFolder+"/Nh_"+fileName+"/PMS186cp/Nh_"+fileName+"_pms186cp_rev.ai");
createFile(rootFolder+"/Nh_"+fileName+"/4c_CMYK/Nh_"+fileName+"_4c.ai", rootFolder+"/Nh_"+fileName+"/PMS186cp/Nh_"+fileName+"_pms186cp.ai");

createFile(rootFolder+"/Nv_"+fileName+"/4c_CMYK/Nv_"+fileName+"_4c_rev.ai", rootFolder+"/Nv_"+fileName+"/PMS186cp/Nv_"+fileName+"_pms186cp_rev.ai");
createFile(rootFolder+"/Nv_"+fileName+"/4c_CMYK/Nv_"+fileName+"_4c.ai", rootFolder+"/Nv_"+fileName+"/PMS186cp/Nv_"+fileName+"_pms186cp.ai");

function createFile(sourceDoc, destDoc){
        sourceDoc = open(new File(sourceDoc));
        destDoc = open(new File(destDoc));
        
        var scarlet = destDoc.swatches.getByName("PANTONE 186 CP");
        var four_h_green = destDoc.swatches.getByName("PANTONE 347 U");
    
        sourceDoc.activate(); 
    
        sourceDoc.selection = null; 
        sourceDoc.artboards.setActiveArtboardIndex(0); 
        sourceDoc.selectObjectsOnActiveArtboard(); 
        sel = sourceDoc.selection; 
        moveObjects(sel, destDoc); 
    
        var pathItems = destDoc.pathItems;
    
        for (var i = 0; i < pathItems.length; i++) {
            setPantone(pathItems[i], scarlet, four_h_green);
        };
    
        sourceDoc.close(SaveOptions.DONOTSAVECHANGES);
        destDoc.close(SaveOptions.SAVECHANGES);
}

function setPantone(pathItem, scarlet, four_h_green){    
    if(pathItem.fillColor.typename == "CMYKColor"){
        if(Math.round(pathItem.fillColor.black) == 6 && Math.round(pathItem.fillColor.magenta) == 100 && Math.round(pathItem.fillColor.cyan) == 2 && Math.round(pathItem.fillColor.yellow) == 85){
            pathItem.fillColor = scarlet.color;
        }
        if(Math.round(pathItem.fillColor.black) == 2 && Math.round(pathItem.fillColor.magenta) == 15 && Math.round(pathItem.fillColor.cyan) == 83 && Math.round(pathItem.fillColor.yellow) == 80){
            pathItem.fillColor = four_h_green.color;
        }
    }
}

function moveObjects(sel, destDoc) {  
    for (k=0; k<sel.length; k++) {   
        var newItem = sel[k].duplicate(destDoc.layers[sel[k].layer.name],ElementPlacement.PLACEATEND);  
    }  
}  