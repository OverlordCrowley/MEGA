package kz.runtime.backfor_mega.serivce;

import kz.runtime.backfor_mega.entity.Card;

public interface CardService {
    void delete(Card card);
    void save(Card card);

    Card findByNumberAndDataNameAndSvv(String number, String dataName, String svv);
}