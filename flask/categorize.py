import os
import csv
import numpy as np
import pandas as pd

# goal: parse raw csv file to categories


print(os.getcwd())

def add_balance(trans, bal):
    bal += trans
    return [bal]

with open('.\\data\\2024.csv') as f:
    headers = f.readline()
    data = [l for l in csv.reader(f)] # splits into length == 5

    init_bal = 521.04 # kind of a hack

    data = [[l[0], l[1], -float(l[2])+float(l[3])] for l in data]
    data = [tuple(l+add_balance(l[-1], init_bal)) for l in data]

date = [l[0] for l in data]
#print(f'date: {date[:5]}')

desc = [l[1] for l in data]
#print(f'desc: {desc[:5]}')

trans = [float(l[2]) for l in data]
print(f'trans: {trans[:5]}')

category = ["Income" if v > 0 else "parse" for v in trans]
print(category[:5])

balance = [float(l[3]) for l in data]
#print(f'balance: {balance[:5]}')

parsed_data = [[date[i], desc[i], trans[i], balance[i]] for i in range(len(date))]
#print(parsed_data[:5])

parsed_df = pd.DataFrame(parsed_data, columns=['Date', 'Description', 'Amount', 'Balance'])
#print(parsed_df.head())

#print(data[:10])
#print(data[-5:])

#print(sum(1 for l in data if len(l) != 5))