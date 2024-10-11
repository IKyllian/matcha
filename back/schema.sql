DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS user_tag;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS image;
DROP TABLE IF EXISTS view;
DROP TABLE IF EXISTS like;
DROP TABLE IF EXISTS block;
DROP TABLE IF EXISTS message;
DROP TABLE IF EXISTS notification;

CREATE TABLE tag (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    tag_name    NVARCHAR(20) NOT NULL
);

CREATE TABLE user_tag (
    user_id INTEGER NOT NULL,
    tag_id  INTEGER NOT NULL,
    PRIMARY KEY (user_id, tag_id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (tag_id) REFERENCES tag(id)
);

CREATE TABLE user (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    username            NVARCHAR(20)                    NOT NULL,
    pass                BINARY(64)                      NOT NULL,
    email               NVARCHAR(320)                   NOT NULL,
    first_name          NVARCHAR(20)                    NOT NULL,
    last_name           NVARCHAR(20)                    NOT NULL,
    birth_date          TIMESTAMP                       NULL,
    gender              NCHAR(1)                        NULL,
    sexual_preference   NCHAR(1)                        NULL,
    bio                 TEXT                            NULL,
    fame_rating         REAL                            NULL
);

CREATE TABLE image (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    image_file          BINARY(64)  NOT NULL,
    is_profile_picture  BOOLEAN     NOT NULL,
    user_id             INTEGER     NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE view (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id         INTEGER NOT NULL,
    viewed_user_id  INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (viewed_user_id) REFERENCES user(id)
);

CREATE TABLE like (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id         INTEGER NOT NULL,
    liked_user_id   INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (liked_user_id) REFERENCES user(id)
);

CREATE TABLE block (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id         INTEGER NOT NULL,
    blocked_user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (blocked_user_id) REFERENCES user(id)
);

CREATE TABLE message (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    message     TEXT        NOT NULL,
    sender_id   INTEGER     NOT NULL,
    receiver_id INTEGER     NOT NULL,
    created_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES user(id),
    FOREIGN KEY (receiver_id) REFERENCES user(id)
);

CREATE TABLE notification (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    content     TEXT        NOT NULL,
    sender_id   INTEGER     NOT NULL,
    receiver_id INTEGER     NOT NULL,
    created_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    was_seen    BOOLEAN     NOT NULL,
    FOREIGN KEY (sender_id) REFERENCES user(id),
    FOREIGN KEY (receiver_id) REFERENCES user(id)
);