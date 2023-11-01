## 十四、视图

SELECT * FROM demo.trans;

SELECT * FROM demo.goodsmaster;

DROP TABLE demo.trans;

DROP TABLE demo.goodsmaster;

CREATE TABLE
    demo.trans (
        transno TEXT,
        itemnumber TEXT,
        salesquantity DOUBLE,
        salesvalue DOUBLE,
        transdate DATETIME
    );

CREATE TABLE
    demo.goodsmaster (
        itemnumber TEXT,
        barcode TEXT,
        goodsname TEXT,
        salesprice DOUBLE
    );

INSERT INTO demo.trans
VALUES (3456, 1, 1, 89, '2023-11-01'), (3456, 2, 1, 5, '2023-11-01'), (3457, 3, 2, 20, '2023-11-02');

INSERT INTO demo.goodsmaster
VALUES (1, '0001', '书', 89), (2, '0002', '笔', 5), (3, '0003', '胶水', 10);

SELECT
    a.transdate,
    a.itemnumber,
    b.goodsname,
    SUM(a.salesquantity) AS quantity,
    SUM(a.salesvalue) AS salesvalue
FROM demo.trans AS a
    LEFT JOIN demo.goodsmaster AS b ON (a.itemnumber = b.itemnumber)
GROUP BY
    a.transdate,
    a.itemnumber,
    b.goodsname;

CREATE TABLE
    demo.inventoryhist (
        itemnumber TEXT,
        invquantity DOUBLE,
        invdate DATETIME
    );

INSERT INTO demo.inventoryhist
VALUES (1, 100, '2023-11-01'), (2, 99, '2023-11-01'), (3, 88, '2023-11-01'), (1, 149, '2023-11-02'), (2, 105, '2023-11-02'), (3, 200, '2023-11-02');

SELECT * FROM demo.inventoryhist;

SELECT * FROM demo.trans;

SELECT
    a.transdate,
    a.itemnumber,
    a.goodsname,
    a.salesquantity,
    b.invquantity
FROM (
        SELECT
            a.transdate,
            a.itemnumber,
            b.goodsname,
            SUM(a.salesquantity) AS salesquantity,
            SUM(a.salesvalue) AS salesvalue
        FROM demo.trans AS a
            LEFT JOIN demo.goodsmaster AS b ON (a.itemnumber = b.itemnumber)
        GROUP BY
            a.transdate,
            a.itemnumber,
            b.goodsname
    ) AS a
    LEFT JOIN demo.inventoryhist AS b ON (
        a.transdate = b.invdate
        AND a.itemnumber = b.itemnumber
    );

--- 创建视图

CREATE VIEW
    demo.trans_goodsmater AS
SELECT
    a.transdate,
    a.itemnumber,
    b.goodsname,
    SUM(a.salesquantity) AS quantity,
    SUM(a.salesvalue) AS salesvalue
FROM demo.trans AS a
    LEFT JOIN demo.goodsmaster AS b ON (a.itemnumber = b.itemnumber)
GROUP BY
    a.transdate,
    a.itemnumber,
    b.goodsname;

SELECT * FROM demo.trans_goodsmater;

SELECT
    a.transdate,
    a.itemnumber,
    a.goodsname,
    a.quantity,
    b.invquantity
FROM demo.trans_goodsmater AS a
    LEFT JOIN demo.inventoryhist AS b ON (
        a.transdate = b.invdate AND a.itemnumber = b.itemnumber
    );