export default function FileInput({ setImg, isUploading }) {
    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImg(e.target.files[0]);
        }
    };

    return (
        <div className="file-input">
            <input type="file" id="file" className="file-input__input" accept="image/png, image/jpeg" onChange={handleChange} name="img " disabled={isUploading} />
            <label htmlFor="file" className={isUploading && 'file-input__disabled'}>
                Select file
                <p className="file-input__file-name"></p>
            </label>
        </div>
    );
}
