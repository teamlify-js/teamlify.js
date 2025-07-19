class MessageEmbed {
    title;
    description;
    url;
    color;
    author;
    thumbnail;
    image;
    footer;

    setTitle(title) {
        this.title = title;
        return this;
    }

    setDescription(description) {
        this.description = description;
        return this;
    }

    setUrl(url) {
        this.url = url;
        return this;
    }

    setColor(color) {
        this.color = this.convertHexColorToNumber(color);
        return this;
    }

    setAuthor(name, iconUrl = null) {
        this.author = { name, icon_url: iconUrl };
        return this;
    }

    setThumbnail(url) {
        this.thumbnail = { url };
        return this;
    }

    setImage(url) {
        this.image = { url };
        return this;
    }

    setFooter(text, iconUrl = null) {
        this.footer = { text, icon_url: iconUrl };
        return this;
    }

    build() {
        return {
            title: this.title,
            description: this.description,
            url: this.url,
            color: this.color,
            author: this.author,
            thumbnail: this.thumbnail,
            image: this.image,
            footer: this.footer
        };
    }

    /**
     * Hexadecimal renk kodunu (örneğin "#RRGGBB" veya "RRGGBB") bir sayıya dönüştürür.
     * @param {string} hexColor - Dönüştürülecek hex renk kodu (örn: "#FF0000", "00FF00", "0000FF").
     * @returns {number} Sayısal formata dönüştürülmüş renk kodu.
     * @throws {Error} Geçersiz bir hex renk kodu formatı algılanırsa hata fırlatır.
     */
    convertHexColorToNumber(hexColor) {
        // Hex string'in başında '#' varsa kaldırın.
        if (hexColor.startsWith('#')) {
            hexColor = hexColor.slice(1);
        }

        // Hex string'in geçerli bir formatta olup olmadığını kontrol edin (6 karakter, sadece hex rakamları).
        if (!/^[0-9A-Fa-f]{6}$/.test(hexColor)) {
            throw new Error(`Geçersiz hex renk kodu formatı: ${hexColor}. Örnek: "RRGGBB" veya "#RRGGBB".`);
        }

        // parseInt ile hex string'i 16 tabanında bir sayıya dönüştürün.
        return parseInt(hexColor, 16);
    }
}

export { MessageEmbed };