import React, { useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Box, Image, Flex, Text } from '@chakra-ui/react';
import Webcam from 'react-webcam';

const CameraComponent = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isImageModalOpen, onOpen: onImageModalOpen, onClose: onImageModalClose } = useDisclosure();
    const webcamRef = React.useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);

    const startCapture = () => {
        setCapturing(true);
    };

    const stopCapture = () => {
        setCapturing(false);
    };

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
        onImageModalOpen();
    };

    const downloadImage = () => {
        const link = document.createElement('a');
        link.href = capturedImage;
        link.download = 'captured_image.jpeg';
        link.click();
    };

    return (
        <>
            <Image src='./img/camera.png' w={50} h={50} onClick={onOpen} />
            <Modal isOpen={isOpen} onClose={() => { onClose(); setCapturedImage(null); }}>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(5px)'
                />
                <ModalContent bg={'transparent'} style={{ backdropFilter: 'blur(20px)' }} >
                    <ModalHeader>Camera</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            {capturing ? (
                                <Webcam
                                    audio={false}
                                    height={400}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                />
                            ) : null}
                            {capturing ? (
                                <Flex p={5} justifyContent='space-around' alignItems='center'>
                                    <Button mr={'100px'} onClick={stopCapture} disabled={!capturing}>
                                        Stop
                                    </Button>
                                    <Image w={55} h={55} src='./img/page.png' onClick={capture} disabled={!capturing}/>
                                </Flex>
                            ) : (
                                <Button onClick={startCapture}>
                                    Start
                                </Button>
                            )}
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Modal isOpen={isImageModalOpen} onClose={onImageModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Captured Image</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {capturedImage && (
                            <>
                                <Image src={capturedImage} alt="Captured" />
                                <Box textAlign='center' mt={4}>
                                    <Button onClick={downloadImage}>
                                        Download
                                    </Button>
                                </Box>
                            </>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CameraComponent;
