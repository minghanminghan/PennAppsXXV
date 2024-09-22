import os
import csv
import pandas as pd

# test path: 'data/2024.csv'

def add_balance(trans, bal):
    bal += trans
    return [bal]

def parse_csv_data(path):

    print(os.getcwd())

    with open(path) as f:
        headers = f.readline()
        data = [l for l in csv.reader(f)] # splits into length == 5
        #print(data[:5])

        init_bal = 521.04 # kind of a hack

        data = [[l[0], l[1], l[2], l[3], -float(l[4])+float(l[5])] for l in data]
        data = [tuple(l+add_balance(l[-1], init_bal)) for l in data]

    date = [l[0] for l in data]
    #print(f'date: {date[:5]}')

    desc = [l[1] for l in data]
    #print(f'description: {desc[:5]}')

    cat = [l[2] for l in data]
    #print(f'category: {cat[:5]}')

    subcat = [l[3] for l in data]
    #print(f'sub-category: {subcat[:5]}')

    trans = [float(l[4]) for l in data]
    #print(f'trans: {trans[:5]}')

    balance = [float(l[5]) for l in data]
    #print(f'balance: {balance[:5]}')

    parsed_data = [[date[i], desc[i], cat[i], subcat[i], trans[i], balance[i]] for i in range(len(date))]


    # final output
    return pd.DataFrame(parsed_data, columns=['Date', 'Description', 'Category', 'Sub-Category', 'Amount', 'Balance'])
    #print(parsed_df)

if __name__ == '__main__':
    path = './data/december.csv'

    