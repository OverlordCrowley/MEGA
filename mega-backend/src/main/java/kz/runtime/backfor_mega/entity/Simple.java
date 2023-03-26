package kz.runtime.backfor_mega.entity;

import kz.runtime.backfor_mega.entityjson.CoinsList;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class Simple {
    private Long price;

    private List<CoinsList> coinsLists;
}