]
<TextField
label="Search For a Crypto Currency.."
variant="outlined"
style={{ marginBottom: 20, width: "100%" }}
onChange={(e) => setSearch(e.target.value)}
/>

<TableContainer>
{loading ? (
  <LinearProgress style={{ backgroundColor: "gold" }} />
) : (
  <Table aria-label="simple table">
    <TableHead style={{ backgroundColor: "#EEBC1D" }}>
      <TableRow>
        {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
          <TableCell
            style={{
              textAlign: "center",
              color: "black",
              fontWeight: "700",
              fontFamily: "Montserrat",
            }}
            key={head}
            align={head === "Coin" ? "" : "right"}
          >
            {head}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>

    <TableBody>
      {handleSearch()
      .slice((page - 1) * 10, (page - 1) * 10 + 10)
      .map((row) => {
        const profit = row.price_change_percentage_24h > 0;
        return (
          <TableRow
            onClick={() => navigate.push(`/coins/${row.id}`)}
            className={classes.row}
            key={row.name}
          >
            <TableCell
              component="th"
              scope="row"
              style={{
                display: "flex",
                gap: 15,
              }}
            >
              <img
                src={row?.image}
                alt={row.name}
                height="50"
                style={{ marginBottom: 10 }}
              />
              <div
                style={{ display: "flex", flexDirection: "column" }}
              >
                <span
                  style={{
                    textTransform: "uppercase",
                    fontSize: 22,
                  }}
                >

                          {row.symbol}
                        </span>
                        <span style={{ color: "darkgrey" }}>
                          {row.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      {symbol}{" "}
                      {numberWithCommas(row.current_price.toFixed(2))}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                        fontWeight: 500,
                      }}
                    >
                      {profit && "+"}
                      {row.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>
                    <TableCell align="center">
                      {symbol}{" "}
                      {numberWithCommas(
                        row.market_cap.toString().slice(0, -6)
                      )}
                      M
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      )}
    </TableContainer>

    <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
  </Container>
</ThemeProvider>
);
}

export default CoinsTable;