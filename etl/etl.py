import pandas as pd
from pymongo import MongoClient

MONGO_URI_MAIN = "mongodb://router1:27017/"
MONGO_URI_SEC = "mongodb://mongoreplica1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2"

def extract():
  client = MongoClient(MONGO_URI_MAIN)
  db = client['Proyecto']
  collection = db['trades']

  imports = pd.DataFrame(list(collection.find()))
  return imports


def transform(extracted):
  countries = pd.read_csv('countries.csv')
  hs2 = pd.read_csv('hs2_eng.csv')
  hs4 = pd.read_csv('hs4_eng.csv')

  countries.set_index('Country', inplace=True)
  hs2.set_index('hs2', inplace=True)
  hs4.set_index('hs4', inplace=True)

  list=[]
  for row in extracted.index:
    list.append({
      'id': extracted['id'][row],
      'date': str(extracted['Year'][row]) + '-' + str(extracted['month'][row]),
      'country': countries.loc[extracted['Country'][row],'Country_name'],
      'type': hs2.loc[int(extracted['hs2'][row]),'hs2_name'],
      'part': hs4.loc[int(extracted['hs4'][row]),'hs4_name'],
      'weight' : extracted['Q2'][row],
      'value' : extracted['Value'][row]
    })

  newdf = pd.DataFrame(list)
  return newdf

def load(transformed):
  client = MongoClient(MONGO_URI_SEC)
  db = client['Proyecto']
  collection = db['trades']

  collection.delete_many({})

  collection.insert_many(transformed.to_dict('records'))

extracted = extract()
transformed = transform(extracted)
load(transformed)