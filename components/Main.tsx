"use client"
import { Container, SimpleGrid, Paper, Button, Box, Text } from "@mantine/core";
import classes from "./css/Main.module.css"
import Upload from "./Upload";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useIntersection } from '@mantine/hooks';

interface DataProps{
    num: number;
    img?: string
}

const PDFEmbed = dynamic( ()=>import("./PDFEmbed"), {ssr:false})

export default function Main(){
    const length = 3 //no of components
    const [data, setData] = useState<DataProps[]>([])
    const updateData = (num:number, img?:string) => setData([...data, {num, img}])
    const removeData = (num:number) => setData( data.filter(o => o.num !== num) )

    const [renderPDF, setPDF] = useState<boolean | JSX.Element >(false)

    
    const { ref, entry } = useIntersection({
        root: null,
        threshold: 1,
    });

    useEffect( ()=>{
        if(entry?.isIntersecting){
            setPDF(<PDFEmbed />)
            return () => {}
        }
    }, [entry] )

    return(
        <Container size="xl" className={classes.mainwrapper}>
            <h1> Upload Essay Image </h1>

            <Container size="sm" >
                <SimpleGrid cols={{ base: 1, sm: 3, lg: 3 }}>
                    {Array.from({length}).map((_:any, i:number) =>(
                        <Paper key={i} shadow="xl" p="md" withBorder radius="md" h={350}>
                            <Upload num={i} updateData={updateData} removeData={removeData} />
                        </Paper>
                    ) )}
                </SimpleGrid>
                <Box ta="center"><Button my="md" disabled={ data.length === 0 }>Convert to Text</Button></Box>
            </Container>
            <Text size="xl" fw={700} ta="center" my="md" mt="xl">Sample Report</Text>
            <Box mih={200}>
            <div ref={ref}>
                {renderPDF ? renderPDF : "Loading ..." }
            </div>
            </Box>
        </Container>
    )

}