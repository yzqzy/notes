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