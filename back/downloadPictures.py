import os
import requests

# Directory where images will be stored
IMAGES_FOLDER = 'pictures'

# Ensure the images folder exists
if not os.path.exists(IMAGES_FOLDER):
    os.makedirs(IMAGES_FOLDER)

# Function to download the image
def download_image(image_url, save_path):
    # Send a GET request to download the image
    response = requests.get(image_url, stream=True)
    if response.status_code == 200:
        with open(save_path, 'wb') as img_file:
            for chunk in response.iter_content(1024):
                img_file.write(chunk)
        print(f"Image saved as {save_path}")
    else:
        print("Failed to download the image.")

def main(gender, age):
    print("Started")
    if gender == 'M':
        genderUrl = "male"
    else :
        genderUrl = "female"

    if age < 26:
        ageUrl = "19-25"
    elif age < 36:
        ageUrl = "26-35"
    elif age < 50:
        ageUrl = "36-50"
    else:
        ageUrl = "51-70"


    # URL of the API endpoint
    url = 'https://this-person-does-not-exist.com/new?time=" + "1733836074302" + "&gender=' + genderUrl + "&age=" + ageUrl + "&etnic=all"
    
    # Make the GET request to the API
    response = requests.get(url)
    if response.status_code != 200:
        print("Failed to fetch data from the API.")
        return

    # Parse the JSON response
    data = response.json()

    # Check if the response contains the 'src' field
    if 'src' in data:
        image_url = f"https://this-person-does-not-exist.com{data['src']}"
        image_name = data['name']
        save_path = os.path.join(IMAGES_FOLDER + "/" + genderUrl + "/" + ageUrl, image_name)

        # Download and save the image
        download_image(image_url, save_path)
    else:
        print("Image source not found in response.")

if __name__ == '__main__':
    for i in range(0, 160):
        if (i < 20):
            main("F", 20)
        elif (i < 40):
            main("F", 30)
        elif (i < 60):
            main("F", 40)
        elif (i < 80):
            main("F", 55)
        if (i < 100):
            main("M", 20)
        elif (i < 120):
            main("M", 30)
        elif (i < 140):
            main("M", 40)
        elif (i < 160):
            main("M", 55)

