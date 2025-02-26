DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS user_tag;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS image;
DROP TABLE IF EXISTS view;
DROP TABLE IF EXISTS like;
DROP TABLE IF EXISTS block;
DROP TABLE IF EXISTS message;
DROP TABLE IF EXISTS notification;
DROP TABLE IF EXISTS report;

CREATE TABLE tag (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    tag_name    NVARCHAR(20) NOT NULL
);

CREATE TABLE user_tag (
    user_id INTEGER NOT NULL,
    tag_id  INTEGER NOT NULL,
    PRIMARY KEY (user_id, tag_id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tag(id)
);

CREATE TABLE user (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    username            NVARCHAR(20)                    NOT NULL,
    pass                BINARY(64)                      NOT NULL,
    email               NVARCHAR(320)                   NOT NULL,
    first_name          NVARCHAR(20)                    NOT NULL,
    last_name           NVARCHAR(20)                    NOT NULL,
    birth_date          TEXT                            NULL,
    gender              NCHAR(1)                        NULL,
    sexual_preference   NCHAR(1)                        NULL,
    bio                 TEXT                            NULL,
    fame_rating         REAL                            NULL,
    latitude            REAL                            NOT NULL,
    longitude           REAL                            NOT NULL,
    is_activated        BOOLEAN                         NOT NULL DEFAULT 0,
    url_identifier      TEXT                            NULL,
    is_connected        BOOLEAN                         NOT NULL DEFAULT 0,
    last_connection     TEXT                            NULL,
    is_valid            BOOLEAN                         NOT NULL,
    position_name       TEXT                            NOT NULL
);

CREATE TABLE image (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    image_file          BINARY(64)  NOT NULL,
    mime_type           TEXT        NOT NULL,
    file_name           TEXT        NOT NULL,
    is_profile_picture  BOOLEAN     NOT NULL,
    user_id             INTEGER     NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE view (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id         INTEGER NOT NULL,
    viewed_user_id  INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (viewed_user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE like (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id         INTEGER NOT NULL,
    liked_user_id   INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (liked_user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE block (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id         INTEGER NOT NULL,
    blocked_user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (blocked_user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE report (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id         INTEGER NOT NULL,
    reported_user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (reported_user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE message (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    message     TEXT        NOT NULL,
    sender_id   INTEGER     NOT NULL,
    receiver_id INTEGER     NOT NULL,
    is_like     BOOLEAN     NOT NULL DEFAULT 0,
    created_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE notification (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    content     TEXT        NOT NULL,
    sender_id   INTEGER     NOT NULL,
    receiver_id INTEGER     NOT NULL,
    created_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    was_seen    BOOLEAN     NOT NULL,
    notif_type  INTEGER     NOT NULL,
    FOREIGN KEY (sender_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES user(id) ON DELETE CASCADE
);