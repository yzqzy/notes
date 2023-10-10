# mysql 必知必会

## 一. 数据存储过程

-- 创建数据库

CREATE DATABASE demo;

-- 查看所有数据库

SHOW DATABASES;

-- 创建数据表

CREATE TABLE
    demo.test (
        barcode text,
        goodsname text,
        price int
    );

-- 查看表结构

DESCRIBE demo.test;

-- 查看表

USE demo;

SHOW TABLES;

-- 添加主键、修改表结构

ALTER TABLE demo.test
ADD
    COLUMN itemnumber int PRIMARY KEY AUTO_INCREMENT;

-- 插入数据

INSERT INTO
    demo.test (barcode, goodsname, price)
VALUES ('001', '本', 3);

## 二. 字段类型

-- 创建数据表

CREATE TABLE
    demo.goodsmaster (
        barcode text,
        goodsname text,
        price double,
        itemnumber int PRIMARY KEY AUTO_INCREMENT
    );

-- 插入数据

INSERT INTO
    demo.goodsmaster (barcode, goodsname, price)
VALUES ('0001', '书', 0.47);

INSERT INTO
    demo.goodsmaster (barcode, goodsname, price)
VALUES ('0002', '笔', 0.44);

INSERT INTO
    demo.goodsmaster (barcode, goodsname, price)
VALUES ('0002', '胶水', 0.19);

-- 查询数据

SELECT * FROM demo.goodsmaster;

SELECT SUM(price) FROM demo.goodsmaster;

-- 修改表字段类型

ALTER TABLE demo.goodsmaster MODIFY COLUMN price DECIMAL(5,2);

## 三. 创建、修改数据表

-- 创建表 importhead

CREATE TABLE
    demo.importhead (
        listnumber INT,
        supplierid INT,
        stocknumber INT,
        -- 设置默认值 1
        importtype INT DEFAULT 1,
        quantity DECIMAL(10, 3),
        importvalue DECIMAL(10, 2),
        recorder INT,
        recordingdate DATETIME
    );

-- 插入数据

INSERT INTO
    demo.importhead (
        listnumber,
        supplierid,
        stocknumber,
        -- 没有插入字段 importtype
        quantity,
        importvalue,
        recorder,
        recordingdate
    )
VALUES (
        1234,
        1,
        1,
        10,
        100,
        1,
        '2023-10-09'
    );

-- 查询数据

SELECT * from demo.importhead;

-- 创建表，复制表结构

CREATE TABLE demo.importheadhist LIKE demo.importhead;

-- 添加表字段

ALTER TABLE demo.importheadhist ADD confirmer INT;

ALTER TABLE demo.importheadhist ADD confirmdate DATETIME;

DESCRIBE demo.importheadhist;

-- 修改表字段（修改名称及类型）

ALTER TABLE
    demo.importheadhist CHANGE quantity importquantity DOUBLE;

-- 修改表字段（修改类型）

ALTER TABLE demo.importheadhist MODIFY importquantity DECIMAL(10,3);

-- 添加表字段（指定字段位置）

ALTER TABLE
    demo.importheadhist
ADD
    suppliername TEXT AFTER supplierid;

## 四. 增删改查

-- 准备工作

SELECT * FROM demo.goodsmaster;

DESCRIBE demo.goodsmaster;

ALTER TABLE demo.goodsmaster MODIFY barcode TEXT NOT NULL;

ALTER TABLE demo.goodsmaster MODIFY goodsname TEXT NOT NULL;

ALTER TABLE demo.goodsmaster MODIFY price DECIMAL(10,2) NOT NULL;

ALTER TABLE demo.goodsmaster ADD COLUMN sepcification TEXT;

ALTER TABLE demo.goodsmaster ADD unit TEXT;

-- 插入数据（全部字段）

INSERT INTO
    demo.goodsmaster (
        itemnumber,
        barcode,
        goodsname,
        sepcification,
        unit,
        price
    )
VALUES (4, '0003', '尺子', '三角型', '把', 5);

-- 插入数据（部分字段）

INSERT INTO
    demo.goodsmaster (barcode, goodsname, price)
VALUES ('0004', '测试', 10);

-- 删除数据

DELETE FROM demo.goodsmaster;

-- 查询数据（指定 WHERE 条件）

SELECT * FROM demo.goodsmaster WHERE itemnumber = 4;

-- 修改数据

UPDATE demo.goodsmaster SET itemnumber = 3 WHERE itemnumber = 4;

-- 查询数据（FROM）

SELECT a.goodsname, a.price
FROM (
        SELECT *
        FROM
            demo.goodsmaster
    ) AS a;

--插入数据

INSERT INTO
    demo.goodsmaster (barcode, goodsname, price)
VALUES('0003', '尺子1', 15);

INSERT INTO
    demo.goodsmaster (barcode, goodsname, price)
VALUES('0004', '测试1', 20);

-- 查询数据（ORDER BY）

SELECT * FROM demo.goodsmaster ORDER BY barcode ASC, price DESC;

-- 查询数据（LIMIT）

SELECT * FROM demo.goodsmaster LIMIT 1,2;

-- 插入数据（ON DUPLICATE）

SELECT * FROM demo.goodsmaster;

DELETE FROM demo.goodsmaster;

DROP TABLE demo.goodsmaster;

CREATE TABLE
    demo.goodsmaster (
        itemnumber INT PRIMARY KEY AUTO_INCREMENT,
        barcode TEXT NOT NULL,
        goodsname TEXT NOT NULL,
        specifiction TEXT,
        unit TEXT,
        salesprice DECIMAL(10, 2)
    );

INSERT INTO
    demo.goodsmaster (
        barcode,
        goodsname,
        specifiction,
        unit,
        salesprice
    )
VALUES ('0001', '书', '16开', '本', 89), ('0002', '笔', '10支装', '包', 5);

INSERT INTO
    demo.goodsmaster (
        barcode,
        goodsname,
        unit,
        salesprice
    )
VALUES ('0003', '橡皮', '个', 3);

CREATE TABLE demo.goodsmaster1 LIKE demo.goodsmaster;

INSERT INTO
    demo.goodsmaster1 (barcode, goodsname, salesprice)
VALUES ('0001', '教科书', 89);

INSERT INTO
    demo.goodsmaster1 (
        itemnumber,
        barcode,
        goodsname,
        specifiction,
        unit,
        salesprice
    )
VALUES (4, '0004', '馒头', '', '', 1.5);

-- 插入数据（ON DUPLICATE）

INSERT INTO demo.goodsmaster
SELECT *
FROM
    demo.goodsmaster1 AS a ON DUPLICATE KEY
UPDATE
    barcode = a.barcode,
    goodsname = a.goodsname;

## 五. 设置主键