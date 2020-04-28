<template>
  <div id="detail" name="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramsInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addTocart"></detail-bottom-bar>
  </div>
</template>

<script>
  import DetailNavBar from "./childConps/DetailNavBar";
  import DetailSwiper from "./childConps/DetailSwiper";
  import DetailBaseInfo from "./childConps/DetailBaseInfo";
  import DetailShopInfo from "./childConps/DetailShopInfo";
  import DetailGoodsInfo from "./childConps/DetailGoodsInfo";
  import DetailParamInfo from "./childConps/DetailParamInfo";
  import DetailCommentInfo from "./childConps/DetailCommentInfo";
  import GoodsList from "../../components/content/goods/GoodsList";
  import DetailBottomBar from "./childConps/DetailBottomBar";

  import Scroll from "../../components/common/scroll/Scroll";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "../../network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      Scroll,
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramsInfo: {},
        commentInfo: {},
        recommends: {},
        themeTopYs: [],
      }
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index])
      },
      addTocart() {
        const product = {}
        product.image = this.topImages[0];
        product.title = this.detailInfo.title;
        product.desc = this.detailInfo.desc;
        product.price = this.detailInfo.newPrice;
        product.iid = this.iid;

        this.$store.commit('addCart', product)
      }
    },
    mounted() {

    },
    updated() {
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    },
    created() {
      this.iid = this.$route.params.iid;

      getDetail(this.iid).then(res => {
        const data = res.result;
        this.topImages = res.result.itemInfo.topImages;

        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        this.shop = new Shop(data.shopInfo);

        this.detailInfo = data.detailInfo;

        this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

      })

      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 999;
    background-color: #fff;
  }

  .content {
    height: calc(100vh - 44px);
  }

  .detail-nav-bar {
    position: relative;
    z-index: 99;
    background-color: #fff;
  }
</style>
