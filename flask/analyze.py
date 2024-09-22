import os
import json
import math
import pandas as pd # for testing
import categorize as cat
from datetime import date


def json_to_dict(json_data:json)->dict:
    parsed = json.loads(json_data, parse_int=int, parse_float=float)
    #print(parsed)
    return parsed


def get_cats(data:dict)->dict: # returns dict of dfs
    df = pd.DataFrame.from_dict(data)
    df.groupby(df['Category'])
    dfs = dict(tuple(df.groupby('Category')))
    return dfs

def get_spending_descriptors(data:dict)->dict:
    # define response
    stats = {
        'mean':{},
        'median':{},
        'mode':{},
        'max':{},
        'stdev':{},
    }

    dfs = get_cats(data)
    dfs.pop('Income', None)
    for name, df in zip(dfs.keys(), dfs.values()):
        stats['mean'][name] = abs(round(df['Amount'].aggregate('mean'), 2))
        stats['median'][name] = abs(round(df['Amount'].median(), 2))
        stats['mode'][name] = abs(round(df['Amount'].mode()[0], 2)) # returns single value when there may be multiple modes (largest?)
        stats['max'][name] = round(df['Amount'].abs().max(), 2)
        stats['stdev'][name] = round(df['Amount'].abs().std(), 2)
    #print(stats)
    return stats


def get_moving_average(data:dict, window=30)->dict: # defaults to 30 day moving average
    # isolate total spending
    balance = pd.DataFrame(list(data['Balance'].values()))
    mov_avg = balance.ewm(0.5).mean()
    return {'mov_avg': mov_avg[0].to_dict()}
    

def projection(data:dict, window=30)->any:
    '''
    TODO: write this function out
    '''
    return {}


def get_period(data:dict)->int: # get distance between 2 dates
    period = sorted(set(data['Date'].values())) # number of days
    d0 = [int(i) for i in period[0].split('/')]
    d1 = [int(i) for i in period[-1].split('/')]
    d0 = date(d0[2], d0[0], d0[1]) # date recorded as
    d1 = date(d1[2], d1[0], d1[1])
    delta = abs((d1 - d0).days)
    return delta


def get_score(ev:float, observed:float, scale:float, weight:float)->float:
    # consider implementing scale factor
    #score = math.e**(-(((observed-ev)/ev)**2))
    score = (ev-observed)/ev # taking % diff
    return score * weight


def grade_spending(data:dict, prefs:dict=None)->dict:
    """
    Criteria:
    - 40%   non-essential spending to income ratio
    - 35%   saving to income ratio
    - 20%   variance in expectations vs reality
    - 5%    high variance in non-essential spending (overspending/impulse buying)
    """

    score = 100
    weights = {
        'saving to income': 0.4,
        'bad spending to income': 0.4,
        'real variance': 0.15,
        'bad spending variance': 0.05
    }

    # getting shape of data
    period = get_period(data) # number of days data tracks

    current_balance = sum(a for a in data['Amount'].values())
    total_income = sum(a for a in data['Amount'].values() if a > 0)
    total_spending = abs(current_balance - total_income)
    monthly_income = total_income / period * 30
    monthly_spending = total_spending / period * 30

    bad_spending = [data['Amount'][i] for i in data['Amount'].keys() if (data['Category'][i] == 'Miscellaneous' or data['Sub-Category'][i] == 'Private')]
    bad_spending_total = abs(sum(bad_spending))
    
    income_to_spending = total_spending / total_income

    if prefs == None: # no prefs, create as a percentage of monthly income
        prefs = {
            'Food': monthly_income * 0.15,
            'Housing': monthly_income * 0.25,
            'Miscellaneous': monthly_income * 0.10,
            'Transportation': monthly_income * 0.10,
        }

    diffs = get_cats(data) # returns dict of dataframes
    diffs.pop('Income')
    diffs = {k:(abs(v['Amount'].sum()) / period * 30) for k, v in diffs.items()}
    # diffs = {k:abs((v-prefs[k])/prefs[k]) for k, v in diffs.items()}

    nonessential_score = get_score(total_income * 0.3, bad_spending_total / total_income, 1, 0.4) # 40% of score; target = 0.3
    bad_variance_score = get_score(0.2, (pd.DataFrame(bad_spending).std()[0]) / (bad_spending_total / period * 30), 1, 0.05) #5% of score; target = 0.20
    savings_score = get_score(total_income * 0.2, 1 - income_to_spending, 1, 0.2) # 40% of score; target = 0.2
    diffs = {k:get_score(prefs[k], v, 1, 0.05) for k, v in diffs.items()}

    #print(nonessential_score, bad_variance_score, savings_score, diffs, sep='\n')
    score = int((nonessential_score + bad_variance_score + savings_score + sum(diffs.values()))*100)
    grade = {
        'A+': 100,
        'A': 96,
        'A-': 92,
        'B+': 89,
        'B': 86,
        'B-': 82,
        'C+': 79,
        'C': 76,
        'C-': 72,
        'D+': 69,
        'D': 66,
        'F': 0
    }
    my_grade = 'A+'
    for k, v in reversed(grade.items()):
        if v > score:
            break
        my_grade = k


    return {'score': score,
            'grade': my_grade}


def analyze(raw=None)->dict:
    '''
    TODO: fix routing issue
    '''
    #data = json_to_dict(json_data)
    raw = cat.csv_to_df('../data/2024.csv').to_json()
    data = json_to_dict(raw)
    
    desc_stats = get_spending_descriptors(data) # descriptive statistics of spending
    #print(desc_stats)
    mov_avg = get_moving_average(data, 30) # n-day moving average of the balance (default 30)
    #print(mov_avg)
    proj = projection(data)
    #print(proj)
    score = grade_spending(data)
    return dict(desc_stats, **mov_avg, **proj, **score)


def main(): # tests
    test_path = '/data/2024.csv'
    raw = cat.csv_to_df(test_path).to_json()
    data = json_to_dict(raw)
    
    desc_stats = get_spending_descriptors(data) # descriptive statistics of spending
    #print(desc_stats)
    mov_avg = get_moving_average(data, 30) # n-day moving average of the balance (default 30)
    #print(mov_avg)
    proj = projection(data)
    #print(proj)
    score = grade_spending(data)
    #print(score)
    print(dict(desc_stats, **mov_avg, **proj, **score))


if __name__ == '__main__':
    main()