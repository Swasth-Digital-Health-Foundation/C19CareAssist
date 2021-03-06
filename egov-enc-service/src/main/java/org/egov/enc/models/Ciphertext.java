package org.egov.enc.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.egov.tracer.model.CustomException;

@AllArgsConstructor
@Getter
public class Ciphertext {

    private int keyId;

    private String initialVector;

    private String ciphertext;

    public Ciphertext(String ciphertext) {
        try{
            String[] cipherArray = ciphertext.split("\\|");
            this.keyId = Integer.parseInt(cipherArray[0]);
            this.initialVector = cipherArray[1];
            this.ciphertext = cipherArray[2];
        } catch (Exception e) {
            throw new CustomException(ciphertext + ": Invalid Ciphertext", ciphertext + ": Invalid Ciphertext");
        }
    }

    @Override
    public String toString() {
        return keyId + "|" + initialVector + "|" + ciphertext;
    }

}
