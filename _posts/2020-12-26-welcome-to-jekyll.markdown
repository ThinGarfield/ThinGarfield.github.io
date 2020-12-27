---
layout: default
title:  "Cow Rectangles"
date:   2020-12-26 21:09:36 -0800
categories: jekyll update
---

# USACO 2015 January Contest, Gold Problem 1. Cow Rectangles

Problem [link](http://usaco.org/index.php?page=viewproblem2&cpid=514).

## Analysis
We can afford $n^3$ time and space if we are careful. Use bool array
$g[c1][c2][r1]$ to represent whether $G$ type appear in the row $r_1$
between columns $c_1$ and $c_2$ inclusive. Use $h[c1][c2][r1]$ to represent
the number of $H$ types in the row $r_1$
between columns $c_1$ and $c_2$ inclusive.

We can use $n^3$ loops to populate $g$ and $h$ arrays. 
Then for each $c_1 \leq  c_2$ pair, we iterate through the rows in order,
finding the largest possible row range that contain the most $H$ types,
without any $G$ types. 

Note we want to sort the cows by rows and columns, and we want to establish
an index to point to the $i$-th row from a given cow. Use 4 maps for this purpose.

## Code
```cpp
#define OUTPUT_FILE "cowrect.out"
#define INPUT_FILE "cowrect.in"

#include <bits/stdc++.h>
using namespace std;
using int64 = long long;

constexpr int maxn = 504;

int n;
int r, c;  // number of rows and columns with cows, resp.
map<int, int> row_1tr;
map<int, int> row_rt1;
map<int, int> col_1tc;
map<int, int> col_ct1;

tuple<int, int, bool> cows[maxn];

vector<bool> g[maxn][maxn];
vector<short> h[maxn][maxn];

int area(int r1, int r2, int c1, int c2) {
    return (row_1tr[r2] - row_1tr[r1]) * (col_1tc[c2] - col_1tc[c1]);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    ifstream fin(INPUT_FILE);
    ofstream fout(OUTPUT_FILE);

    fin >> n;
    set<int> rownums;
    set<int> colnums;
    for (int i = 1; i <= n; i++) {
        fin >> get<0>(cows[i]) >> get<1>(cows[i]);
        char x;
        fin >> x;
        get<2>(cows[i]) = (x == 'H');
        rownums.emplace(get<0>(cows[i]));
        colnums.emplace(get<1>(cows[i]));
    }

    r = rownums.size();
    auto it = rownums.begin();
    for (int i = 1; i <= r; i++, it++) {
        row_1tr.emplace(i, *it);
        row_rt1.emplace(*it, i);
    }
    c = colnums.size();
    it = colnums.begin();
    for (int i = 1; i <= c; i++, it++) {
        col_1tc.emplace(i, *it);
        col_ct1.emplace(*it, i);
    }

    for (int i = 1; i <= c; i++) {
        for (int j = i; j <= c; j++) {
            h[i][j].resize(r + 1);
            g[i][j].resize(r + 1);
        }
    }

    for (int i = 1; i <= n; i++) {
        int rown = row_rt1[get<0>(cows[i])];
        int coln = col_ct1[get<1>(cows[i])];
        if (get<2>(cows[i])) {
            for (int c1 = coln; c1 > 0; c1--) {
                for (int c2 = coln; c2 <= c; c2++) {
                    h[c1][c2][rown]++;
                }
            }
        } else {
            for (int c1 = coln; c1 > 0; c1--) {
                for (int c2 = coln; c2 <= c; c2++) {
                    g[c1][c2][rown] = true;
                }
            }
        }
    }

    int maxcows = 0;
    int minarea = 10000000;
    for (int c1 = 1; c1 <= c; c1++) {
        for (int c2 = c1; c2 <= c; c2++) {
            int beginr = 1;

            while (beginr <= r) {
                int cownter = 0;
                while (beginr <= r && !g[c1][c2][beginr] && h[c1][c2][beginr] == 0) beginr++;
                int endr = beginr;
                while (endr <= r && !g[c1][c2][endr]) {
                    cownter += h[c1][c2][endr];
                    endr++;
                }
                int realendr = endr - 1;
                while (realendr >= beginr && h[c1][c2][realendr] == 0) realendr--;

                if (cownter > maxcows) {
                    maxcows = cownter;
                    minarea = area(beginr, realendr, c1, c2);
                } else if (cownter == maxcows) {
                    minarea = min(minarea, area(beginr, realendr, c1, c2));
                }
                beginr = endr + 1;
            }
        }
    }

    fout << maxcows << '\n' << minarea << '\n';
    fin.close();
    fout.close();
    return 0;
}
```

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
