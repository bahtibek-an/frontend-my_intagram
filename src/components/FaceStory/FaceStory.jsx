import { Avatar, Box, Flex, Image, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Progress, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import CameraComponent from "../CameraComponent/CameraComponent";

const FaceStory = () => {
    const avatarCount = useBreakpointValue({ base: 5, sm: 6, md: 6, lg: 6 });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedImage, setSelectedImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const img = {
        img1: "./img/images/img1.jpg",
        img2: "./img/images/img2.jpg",
        img3: "./img/images/img6.jpeg",
        img4: "./img/images/img4.jpg",
        img5: "./img/images/img5.jpeg",
        img6: "./img/images/img3.jpg",
        img7: "./img/images/img7.jpg",
    };


    const openModalWithImage = (imgKey) => {
        setProgress(0);
        setSelectedImage(img[imgKey]);
        onOpen();
    };

    useEffect(() => {
        let interval;

        if (isOpen) {
            interval = setInterval(() => {
                if (progress < 100) {
                    setProgress((prevProgress) => prevProgress + 1);
                } else {
                    clearInterval(interval);
                    onClose();
                    setSelectedImage(null);
                }
            }, 30); 
        }

        return () => clearInterval(interval);
    }, [progress, isOpen, onClose]);

    return (
        <Box maxW={'container.sm'} overflow={'hidden'} h={'10vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Flex gap={3} justifyContent={'space-around'} alignItems={'center'}>
                <CameraComponent />
                {[...Array(avatarCount)].map((_, index) => (
                    <Box
                        key={index}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        w={'52px'}
                        h={'53px'}
                        borderRadius={'100%'}
                        style={{ background: 'linear-gradient(120deg,red,blue,yellow)', cursor: 'pointer' }}
                        onClick={() => openModalWithImage(`img${index + 1}`)}
                    >
                        <Avatar src={img[`img${index + 1}`]} alt={`Avatar ${index + 1}`} />
                    </Box>
                ))}
            </Flex>

            <Modal  isCentered isOpen={isOpen} size={'sm'} onClose={onClose}>
                <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px)' />
                <ModalContent bg={'transparent'} style={{ backdropFilter: 'blur(20px)' }}>
                    <ModalHeader>
                        {selectedImage && <Avatar src={selectedImage} alt="Selected Avatar Image" />}
                    </ModalHeader>
                    <ModalBody p={4}>
                        {selectedImage && <Image src={selectedImage} alt="Selected Avatar Image" />}
                        <Progress value={progress} size="sm" borderRadius="full" colorScheme="teal" mt={4} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default FaceStory;
