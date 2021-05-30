import requests as requests

# open 2 local files in read-byte mode
train_file = open('C:\\Users\\NicoleS\\Downloads\\Telegram Desktop\\Train_Little.csv', 'rb')
test_file = open('C:\\Users\\NicoleS\\Downloads\\Telegram Desktop\\Test_Little.csv', 'rb')
files = {"trainFile": train_file, "testFile": test_file}
#files = {"file1": train_file, "file2": test_file}
# rest of data for request
data = {"algo_choice": "Hybrid"}

url = "http://localhost:8080/detect"
# send post request to the specified url with the 2 files and the rest of the data
# should get JSON response
response = requests.post(url, files=files, data=data)

# show JSON
print(response.text)


