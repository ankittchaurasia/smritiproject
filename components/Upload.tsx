"use client"
import { useState, useRef, memo, useCallback } from "react";
import classes from "./css/Upload.module.css"
import { Box, FileButton, Modal, Center, Button } from "@mantine/core";
import { Plus, X } from 'tabler-icons-react';
import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop, {type Crop} from 'react-image-crop'
import { useDisclosure } from '@mantine/hooks';


interface DataProps {
    num: number;
    updateData: (num:number, img?: string) => void;
    removeData: (num:number) => void;
}


function Upload(props:DataProps){
    const [file, setFile] = useState<File | Blob | null>(null);
    const [opened, { open, close }] = useDisclosure(false);
    const resetRef = useRef<() => void>(null);
    const [cropimg, setCroppedImage] = useState< string | null>(null)


    const addImage = useCallback( (file: File | null) =>{
        setFile(file)
        open()
    }, [])

    const removeImage =  () => {
        setFile(null);
        props.removeData(props.num)
    };


    return <>
    <div className={classes.mainwrapper}>
        {!file && 
            <span>
                <FileButton resetRef={resetRef} onChange={addImage} accept="image/png,image/jpeg">
                    {(props) => <Plus size={50} {...props} strokeWidth={2} />}
                </FileButton>
            </span>
        }
        {file && opened && <CropModal  {...{ opened, props, close, file, removeImage, setCroppedImage }} /> }
       
        {file && !opened &&
        <>
            <button onClick={removeImage} className={classes.cross}><X size={20} strokeWidth={2.5} /></button>
            <img src={cropimg || undefined} width="100%" height="100%" />
        </>
        }

    </div>
    </>

}

const CropModal = memo( ({opened, close, removeImage, file, props, setCroppedImage}:any) => {
    const [img, setImg] = useState< HTMLImageElement | null >(null)

    const [crop, setCrop] = useState<Crop>({
        unit: '%',
        x: 0,
        y: 0,
        width: 32,
        height: 32
    })

    const handleCrop = () => {
        if (file && crop.width && crop.height && img) {
            const canvas = document.createElement('canvas');
            const scaleX = img.naturalWidth / img.width;
            const scaleY = img.naturalHeight / img.height;
            canvas.width = crop.width;
            canvas.height = crop.height;
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
 
            const pixelRatio = window.devicePixelRatio;
            canvas.width = crop.width * pixelRatio;
            canvas.height = crop.height * pixelRatio;
            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            ctx.imageSmoothingQuality = 'high';
            
            ctx.drawImage(
                img,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height,
            );
            
            // Converting to base64
            const base64Image = canvas.toDataURL('image/jpeg');
            setCroppedImage(base64Image);
            props.updateData(props.num, base64Image)
        };
    } 

    return(
        <Modal opened={opened} onClose={()=>{removeImage(); close()}} title="Crop Image" size="lg">
        <Center>
            <ReactCrop crop={crop} onChange={setCrop} >
            <img src={file ? URL.createObjectURL(file): undefined} onLoad={(e) => setImg(e.currentTarget)} />
            </ReactCrop>
        </Center>
        <Box ta="center" mt="xs"><Button onClick={()=>{handleCrop(); close()}}>Crop</Button></Box>
        </Modal>
    )
})

export default memo(Upload);