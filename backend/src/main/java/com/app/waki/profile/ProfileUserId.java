package com.app.waki.profile;

import io.jsonwebtoken.lang.Assert;

record ProfileUserId(String userId) {

    public ProfileUserId {
        Assert.notNull(userId, "id must not be null");
    }
}
