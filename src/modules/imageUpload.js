export function handleImageUpload() {
    let image = document.getElementById('upload').files[0];
    let reader = new FileReader();

    reader.onload = function (e) {
        image = document.getElementById('upload').files[0];
        document.getElementById('image').src = e.target.result;
    };
    reader.readAsDataURL(image);

}