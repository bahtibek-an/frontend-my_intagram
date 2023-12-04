import './Create.css'
import drag from "../images/drag.jpeg"
import { db, imageDb } from '../../firebase'
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';





const Create = ({ getUsers, users, id, close, setNewPublication, dark}) => {

    const download = (files) => {
        const imgRef = ref(imageDb, `files/${id}/${uuidv4()}`)
        uploadBytes(imgRef, files).then((value) => {
            getDownloadURL(value.ref)
                .then((url) => {
                    users.forEach((user) => {
                        if (user.id === id) {
                            upDateUser(url, user, value.metadata.name, value.metadata.contentType)
                            close()
                            getUsers()
                        }
                    })
                })
        })
    }

    const upDateUser = async (url, user, idPhoto, type) => {
        await setDoc(doc(db, "users", `${id}`), { ...user, publications: [...user.publications, { url: url, date: Number(Date.now()), id: idPhoto, type: type, comments: [], likes: [] }] });
        setNewPublication({...user, publications: [...user.publications, { url: url, date: Number(Date.now()), id: idPhoto, type: type, comments: [], likes: [] }]})
    }


    const importData = () => {
        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = () => {
            let files = input.files[0];
            download(files)
        };
        input.click();
    }

    return (
        <>
            <div className='create_div' style={{backgroundColor: dark ? "#3f3f3f" : "#000"}}>
                <h4>Create a publication</h4>
                <hr />
                <div className='c_area'>
                    <img src={drag} alt="drag" />
                    <h3>Drag photos and videos here</h3>
                    <button onClick={importData}>select on computer</button>
                </div>
            </div>
        </>
    )
}


export default Create
