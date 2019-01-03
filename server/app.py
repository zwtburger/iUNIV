#coding:utf-8

from flask import Flask, request, jsonify
from dummyData import userList, actList
from utils import *

app = Flask(__name__)

@app.route('/')
def index():
    return jsonify({'errcode': 0, 'errmsg': 'ok'})

@app.route('/create')
def create():
    nickName = request.args.get('nickName')
    avatarUrl = request.args.get('avatarUrl')
    province = request.args.get('province')
    city = request.args.get('city')

    info = {
        'nickName': nickName,
        'avatarUrl': avatarUrl,
        'province': province,
        'city': city
    }

    userInfo = insertUser(info)

    return jsonify({'errcode': 0, 'errmsg': 'ok', 'userInfo': userInfo})

@app.route('/login')
def login():
    nickName = request.args.get('nickName')
    avatarUrl = request.args.get('avatarUrl')
    province = request.args.get('province')
    city = request.args.get('city')

    info = {
        'nickName': nickName,
        'avatarUrl': avatarUrl,
        'province': province,
        'city': city
    }

    userInfo = findUserByInfo(info)

    return jsonify({'errcode': 0, 'errmsg': 'ok', 'userInfo': userInfo})

@app.route('/activity')
def activity():
    return jsonify({'errcode': 0, 'errmsg': 'ok', 'actList': actList})

@app.route('/walk')
def walk():
    return jsonify({'errcode': 0, 'errmsg': 'ok', 'userList': userList})

@app.route('/actInfo')
def actInfo():
    uid = request.args.get('uid')
    aid = request.args.get('aid')
    actInfo = findActByID(aid)
    joinUid = actInfo['joinList']
    joinList = []
    for user in userList:
        if user['uid'] in joinUid:
            joinList.append(user)
    newActInfo = actInfo.copy()
    newActInfo['joinList'] = joinList
    if uid in joinUid:
        newActInfo['ifJoin'] = True
    else:
        newActInfo['ifJoin'] = False
    return jsonify({'errcode': 0, 'errmsg': 'ok', 'actInfo': newActInfo})

@app.route('/userInfo')
def userInfo():
    uid1 = request.args.get('uid1')
    uid2 = request.args.get('uid2')
    user = findUserByID(uid1)
    newUserInfo = findUserByID(uid2).copy()
    if uid2 in user['followList']:
        newUserInfo['ifFollow'] = True
    else:
        newUserInfo['ifFollow'] = False
    return jsonify({'errcode': 0, 'errmsg': 'ok', 'userInfo': newUserInfo})

@app.route('/followList')
def followList():
    uid = request.args.get('uid')
    followList = getFollowList(uid)
    return jsonify({'errcode': 0, 'errmsg': 'ok', 'followList': followList})

@app.route('/joinActList')
def joinActList():
    uid = request.args.get('uid')
    joinActList = getJoinActList(uid)
    return jsonify({'errcode': 0, 'errmsg': 'ok', 'joinActList': joinActList})

@app.route('/follow')
def follow():
    uid1 = request.args.get('uid1')
    uid2 = request.args.get('uid2')
    connectFollow(uid1, uid2)
    return jsonify({'errcode': 0, 'errmsg': 'ok'})

@app.route('/unfollow')
def unfollow():
    uid1 = request.args.get('uid1')
    uid2 = request.args.get('uid2')
    disconnectFollow(uid1, uid2)
    return jsonify({'errcode': 0, 'errmsg': 'ok'})

@app.route('/join')
def join():
    uid = request.args.get('uid')
    aid = request.args.get('aid')
    connectJoin(uid, aid)
    return jsonify({'errcode': 0, 'errmsg': 'ok'})

@app.route('/unjoin')
def unjoin():
    uid = request.args.get('uid')
    aid = request.args.get('aid')
    disconnectJoin(uid, aid)
    return jsonify({'errcode': 0, 'errmsg': 'ok'})

if __name__ == '__main__':
    app.run(host = '172.21.0.2', port = 8888, ssl_context = ('2_iUNIVplus.cn.crt', '3_iUNIVplus.cn.key'))
