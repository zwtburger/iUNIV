#coding:utf-8

from dummyData import userList, actList

def printUser(info):
    print(info['nickName'] + ' logins.')
    print('avatarUrldata ' + info['avatarUrl'])
    print('location ' + info['province'] + ' ' + info['city'])

def findUserByInfo(info):
    userInfo = ''
    for user in userList:
        if user['nickName'] == info['nickName'] and info['province'] == info['province'] and user['city'] == info['city']:
            userInfo = user
    return userInfo

def findActByInfo(info):
    actInfo = ''
    for act in actList:
        if act['name'] == info['name'] and act['date'] == info['date'] \
            and act['place'] == info['place'] and act['introduction'] == info['introduction']:
            actInfo = act
    return actInfo

def insertUser(info):
    userInfo = findUserByInfo(info)
    if userInfo == '':
        number = len(userList)
        userInfo = {
            'nickName': info['nickName'],
            'avatarUrl': info['avatarUrl'],
            'province': info['province'],
            'city': info['city'],
            'followList': [],
            'actList': [],
            'uid': str(number + 1)
        }
        userList.append(userInfo)
        return userInfo
    else:
        return userInfo

def insertActivity(info):
    actInfo = findActByInfo(info)
    if actInfo == '':
        number = len(actList)
        actInfo = {
            'name': info['name'],
            'date': info['date'],
            'place': info['place'],
            'introduction': info['introduction'],
            'joinList': [],
            'status': '即将开始',
            'aid': str(number + 1)
        }
        actList.append(actInfo)
        return actInfo
    else：
        return actInfo

def findUserByID(uid):
    for user in userList:
        if uid == user['uid']:
            return user
    return ''

def findActByID(aid):
    for act in actList:
        if aid == act['aid']:
            return act
    return ''

def getFollowList(uid):
    user = findUserByID(uid)
    followUid = user['followList']
    followList = []
    for user in userList:
        if user['uid'] in followUid:
            followList.append(user)
    return followList

def getJoinActList(uid):
    user = findUserByID(uid)
    joinAid = user['actList']
    joinActList = []
    for act in actList:
        if act['aid'] in joinAid:
            joinActList.append(act)
    return joinActList

def connectFollow(uid1, uid2):
    user = findUserByID(uid1)
    if uid2 not in user['followList']:
        user['followList'].append(uid2)
    return

def disconnectFollow(uid1, uid2):
    user = findUserByID(uid1)
    user['followList'].remove(uid2)
    return

def connectJoin(uid, aid):
    user = findUserByID(uid)
    act = findActByID(aid)
    if aid not in user['actList']:
        user['actList'].append(aid)
    if uid not in act['joinList']:
        act['joinList'].append(uid)
    return

def disconnectJoin(uid, aid):
    user = findUserByID(uid)
    act = findActByID(aid)
    user['actList'].remove(aid)
    act['joinList'].remove(uid)
    return
